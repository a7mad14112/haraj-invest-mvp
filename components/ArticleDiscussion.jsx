'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabaseClient';
import { formatPostDate } from '../lib/blogPosts';

const ARTICLE_REPLIES_KEY = 'haraj_invest_article_replies_v1';

function readLocalReplies() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(ARTICLE_REPLIES_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeLocalReplies(replies) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ARTICLE_REPLIES_KEY, JSON.stringify(replies));
  } catch (error) {
    console.warn('Article discussion local write failed:', error);
  }
}

function formatDate(value) {
  try {
    return formatPostDate(value);
  } catch {
    return 'اليوم';
  }
}

export default function ArticleDiscussion({ postSlug, postTitle }) {
  const [replies, setReplies] = useState([]);
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadReplies() {
      const local = readLocalReplies().filter((reply) => reply.article_slug === postSlug);
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('forum_replies')
          .select('*')
          .eq('article_slug', postSlug)
          .eq('status', 'published')
          .order('created_at', { ascending: true })
          .limit(100);
        if (error) throw error;
        if (mounted) setReplies([...(data || []), ...local]);
      } catch (error) {
        console.warn('Article replies remote load failed:', error);
        if (mounted) {
          setReplies(local);
          setMessage({ type: 'warn', text: 'التعليقات العامة تحتاج تشغيل SQL المنتدى في Supabase. تظهر الآن التعليقات المحفوظة محليًا فقط.' });
        }
      }
    }

    loadReplies();
    return () => {
      mounted = false;
    };
  }, [postSlug]);

  function saveLocal(payload) {
    const reply = {
      ...payload,
      id: `local-article-reply-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'published'
    };
    const next = [...readLocalReplies(), reply].slice(-100);
    writeLocalReplies(next);
    setReplies((items) => [...items, reply]);
  }

  async function submit(e) {
    e.preventDefault();
    if (busy) return;

    if (!body.trim()) {
      setMessage({ type: 'warn', text: 'اكتب تعليقًا قبل النشر.' });
      return;
    }

    setBusy(true);
    setMessage({ type: 'info', text: 'جاري نشر التعليق...' });

    const payload = {
      topic_id: null,
      article_slug: postSlug,
      author_name: author.trim() || 'مشارك',
      body: body.trim(),
      status: 'published',
      source_page: typeof location !== 'undefined' ? location.pathname + location.search : `/blog/${postSlug}`
    };

    try {
      const supabase = getSupabase();
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      const payloadWithUser = {
        ...payload,
        user_id: user?.id || null,
        user_email: user?.email || null
      };
      const { data, error } = await supabase.from('forum_replies').insert(payloadWithUser).select().single();
      if (error) throw error;
      setReplies((items) => [...items, data]);
      setBody('');
      setMessage({ type: 'success', text: 'تم نشر التعليق.' });
    } catch (error) {
      console.error(error);
      saveLocal(payload);
      setBody('');
      setMessage({ type: 'warn', text: 'تعذر النشر في قاعدة البيانات. حُفظ التعليق محليًا على هذا الجهاز.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="article-discussion-v135" aria-labelledby="article-discussion-title">
      <div className="forum-section-head-v135">
        <span className="eyebrow">نقاش المقال</span>
        <h2 id="article-discussion-title">ناقش: {postTitle}</h2>
        <p>أضف سؤالًا أو ملاحظة مفيدة. لا تنشر أرقامًا سرية أو بيانات حساسة عن مشروعك.</p>
      </div>

      <div className="forum-replies-v135 article-replies-v135">
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div className="forum-reply-v135" key={reply.id || `${reply.created_at}-${reply.body}`}>
              <div className="forum-reply-meta-v135">
                <b>{reply.author_name || 'مشارك'}</b>
                <span>{formatDate(reply.created_at)}</span>
              </div>
              <p>{reply.body}</p>
            </div>
          ))
        ) : (
          <div className="forum-empty-replies-v135">لا توجد تعليقات بعد. ابدأ النقاش بسؤال محدد.</div>
        )}
      </div>

      <form className="forum-reply-form-v135" onSubmit={submit}>
        <div className="form-grid forum-reply-grid-v135">
          <div className="form-field">
            <label htmlFor="article-comment-author">الاسم</label>
            <input
              id="article-comment-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="اختياري"
              disabled={busy}
            />
          </div>
          <div className="form-field full">
            <label htmlFor="article-comment-body">تعليقك</label>
            <textarea
              id="article-comment-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="اكتب تعليقًا أو سؤالًا حول المقال."
              required
              disabled={busy}
            />
          </div>
        </div>
        {message?.text && <div className={`forum-message-v135 ${message.type}`}>{message.text}</div>}
        <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'جاري النشر' : 'نشر التعليق'}</button>
      </form>
    </section>
  );
}
