'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '../../lib/supabaseClient';

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return '';
  }
}

export default function AskClient() {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('questions')
          .select('id, name, question, answer, answered_at, category')
          .eq('is_published', true)
          .order('answered_at', { ascending: false })
          .limit(50);
        if (!active) return;
        if (error) {
          setItems([]);
        } else {
          setItems(data || []);
        }
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit() {
    const trimmed = question.trim();
    if (trimmed.length < 10) {
      setStatus('من فضلك اكتب سؤالًا أوضح (10 أحرف على الأقل).');
      return;
    }
    setSubmitting(true);
    setStatus('جارٍ إرسال سؤالك...');
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('questions').insert({
        name: name.trim() || null,
        question: trimmed,
        contact: contact.trim() || null,
        status: 'pending',
        is_published: false,
      });
      if (error) {
        setStatus('تعذّر الإرسال حاليًا. تأكد من الاتصال وحاول مجددًا.');
      } else {
        setStatus('تم استلام سؤالك. سنراجعه وننشر الإجابة إن كان مفيدًا للجميع.');
        setName('');
        setQuestion('');
        setContact('');
      }
    } catch {
      setStatus('تعذّر الإرسال حاليًا. حاول مرة أخرى لاحقًا.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="card form-card ask-form-v135">
        <h2>اطرح سؤالك</h2>
        <p className="ask-form-note-v135">
          سؤالك لن يُنشر مباشرة. نراجع الأسئلة وننشر المفيد منها مع إجابته.
        </p>

        <label className="ask-field-v135">
          <span>الاسم (اختياري)</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسمك أو كنيتك"
            maxLength={60}
          />
        </label>

        <label className="ask-field-v135">
          <span>سؤالك</span>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="اكتب سؤالك بوضوح..."
            rows={4}
            maxLength={1000}
          />
        </label>

        <label className="ask-field-v135">
          <span>بريد أو جوال للتواصل (اختياري)</span>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="إن رغبت برد مباشر"
            maxLength={120}
          />
        </label>

        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'جارٍ الإرسال...' : 'إرسال السؤال'}
        </button>

        {status && <div className="ask-status-v135">{status}</div>}
      </div>

      <section className="ask-list-v135">
        <h2>أسئلة أُجيب عنها</h2>

        {loading && <div className="ask-empty-v135">جارٍ تحميل الأسئلة...</div>}

        {!loading && items.length === 0 && (
          <div className="ask-empty-v135">
            لا توجد أسئلة منشورة بعد. كن أول من يطرح سؤالًا.
          </div>
        )}

        {!loading &&
          items.map((item) => {
            const open = openId === item.id;
            return (
              <div className={`ask-qa-v135 ${open ? 'is-open' : ''}`} key={item.id}>
                <button
                  type="button"
                  className="ask-qa-q-v135"
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                >
                  <span className="ask-qa-icon-v135">{open ? '−' : '+'}</span>
                  <span className="ask-qa-text-v135">{item.question}</span>
                </button>
                {open && (
                  <div className="ask-qa-a-v135">
                    <p>{item.answer}</p>
                    <div className="ask-qa-meta-v135">
                      {item.category && <span className="ask-qa-cat-v135">{item.category}</span>}
                      {item.answered_at && <span>{formatDate(item.answered_at)}</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </section>
    </>
  );
}
