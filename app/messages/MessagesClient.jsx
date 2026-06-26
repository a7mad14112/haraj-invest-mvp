'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getSupabase } from '../../lib/supabaseClient';
import { getMyConversations, getMessages, sendMessage } from '../../lib/conversations';

function formatTime(dateStr) {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('ar-SA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateStr));
  } catch {
    return '';
  }
}

export default function MessagesClient() {
  const [authChecked, setAuthChecked] = useState(false);
  const [session, setSession] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);

  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');

  // فحص الجلسة
  useEffect(() => {
    const supabase = getSupabase();
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data?.session || null);
      setAuthChecked(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // تحميل قائمة المحادثات
  const loadList = useCallback(async () => {
    setLoadingList(true);
    try {
      const list = await getMyConversations();
      setConversations(list);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    if (session) loadList();
  }, [session, loadList]);

  // تحميل رسائل محادثة
  const openConversation = useCallback(async (id) => {
    setActiveId(id);
    setLoadingMsgs(true);
    setNotice('');
    try {
      const msgs = await getMessages(id);
      setMessages(msgs);
    } catch {
      setMessages([]);
    } finally {
      setLoadingMsgs(false);
    }
  }, []);

  async function handleSend() {
    const text = draft.trim();
    if (!text || sending || !activeId) return;
    setSending(true);
    setNotice('');
    try {
      const { wasMasked } = await sendMessage({ conversationId: activeId, body: text });
      setDraft('');
      if (wasMasked) {
        setNotice('تنبيه: تم حجب رقم تواصل في رسالتك. التواصل يتم عبر المنصة فقط.');
      }
      const msgs = await getMessages(activeId);
      setMessages(msgs);
      loadList();
    } catch {
      setNotice('تعذّر إرسال الرسالة. حاول مجددًا.');
    } finally {
      setSending(false);
    }
  }

  // غير مسجّل
  if (authChecked && !session) {
    return (
      <div className="messages-auth-gate-v138">
        <div className="info-note">
          لعرض محادثاتك، يلزم تسجيل الدخول أولًا.
        </div>
        <Link className="btn btn-primary" href="/login?next=/messages">تسجيل الدخول</Link>
      </div>
    );
  }

  if (!authChecked) {
    return <div className="messages-loading-v138">جارٍ التحميل...</div>;
  }

  const activeConv = conversations.find((c) => c.id === activeId);

  return (
    <div className="messages-layout-v138">
      <section className="section-head">
        <span className="eyebrow">محادثاتي</span>
        <h1>التواصل حول الفرص</h1>
        <p>كل التواصل يتم ويُوثّق داخل المنصة. أرقام التواصل المباشر تُحجب تلقائيًا.</p>
      </section>

      {!activeId && (
        <div className="messages-inbox-v138">
          {loadingList && <div className="messages-empty-v138">جارٍ تحميل المحادثات...</div>}

          {!loadingList && conversations.length === 0 && (
            <div className="messages-empty-v138">
              لا توجد محادثات بعد. ابدأ بإرسال طلب اهتمام على فرصة، وسيبدأ التواصل هنا.
            </div>
          )}

          {!loadingList &&
            conversations.map((c) => (
              <button
                key={c.id}
                type="button"
                className="messages-inbox-item-v138"
                onClick={() => openConversation(c.id)}
              >
                <div className="messages-inbox-top-v138">
                  <b>{c.opportunity_title || 'محادثة عامة'}</b>
                  <span>{formatTime(c.last_message_at || c.created_at)}</span>
                </div>
                <p>{c.last_message_preview || 'لا توجد رسائل بعد'}</p>
                <span className={`messages-status-v138 status-${c.status}`}>
                  {c.status === 'open' ? 'مفتوحة' : c.status === 'agreed' ? 'تم الاتفاق' : 'مغلقة'}
                </span>
              </button>
            ))}
        </div>
      )}

      {activeId && (
        <div className="messages-thread-v138">
          <button type="button" className="messages-back-v138" onClick={() => setActiveId(null)}>
            ← كل المحادثات
          </button>

          <div className="messages-thread-head-v138">
            <b>{activeConv?.opportunity_title || 'محادثة'}</b>
          </div>

          <div className="messages-bubbles-v138">
            {loadingMsgs && <div className="messages-empty-v138">جارٍ تحميل الرسائل...</div>}

            {!loadingMsgs && messages.length === 0 && (
              <div className="messages-empty-v138">ابدأ المحادثة بكتابة رسالتك أدناه.</div>
            )}

            {!loadingMsgs &&
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`messages-bubble-v138 ${m.sender_role === 'interested' ? 'mine' : 'theirs'}`}
                >
                  <p>{m.body}</p>
                  <span className="messages-bubble-time-v138">{formatTime(m.created_at)}</span>
                </div>
              ))}
          </div>

          {notice && <div className="messages-notice-v138">{notice}</div>}

          <div className="messages-composer-v138">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="اكتب رسالتك... (أرقام التواصل تُحجب تلقائيًا)"
              rows={4}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSend}
              disabled={sending || !draft.trim()}
            >
              {sending ? 'إرسال...' : 'إرسال'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
