// مكتبة نظام المحادثات — حراج إنڤست (المرحلة 2)
import { getSupabase } from './supabaseClient';

// ---------- حجب أرقام التواصل ----------
// يكتشف أرقام الجوال والإيميلات وروابط التواصل ويستبدلها بـ [محجوب].
// ملاحظة: لا يلتقط كل المحاولات (الحروف، الصور)، لكنه يقلّل التسريب ويوثّق المحاولة.
export function maskContactInfo(text) {
  if (!text) return { masked: text, wasMasked: false };

  let wasMasked = false;
  let out = text;

  const patterns = [
    // بريد إلكتروني
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    // أرقام دولية/سعودية بصيغ مختلفة (+966, 00966, 05x)
    /(\+?\d[\d\s\-().]{7,}\d)/g,
    // أرقام عربية الخط
    /([٠-٩][٠-٩\s\-().]{6,}[٠-٩])/g,
    // روابط/معرّفات تواصل شائعة
    /(wa\.me\/\S+|t\.me\/\S+|instagram\.com\/\S+|snapchat\.com\/\S+|@[\w.]{3,})/gi,
  ];

  for (const re of patterns) {
    out = out.replace(re, (m) => {
      // تجاهل المطابقات القصيرة جدًا التي قد تكون أرقامًا عادية في النص
      const digits = (m.match(/[\d٠-٩]/g) || []).length;
      if (re.source.includes('@') || re.source.includes('wa') || digits >= 7) {
        wasMasked = true;
        return '[محجوب]';
      }
      return m;
    });
  }

  return { masked: out, wasMasked };
}

// ---------- إنشاء أو جلب محادثة لفرصة ----------
// لكل (مستخدم + فرصة) محادثة واحدة. إن وُجدت تُعاد، وإلا تُنشأ.
export async function getOrCreateConversation({ opportunityId, opportunityTitle }) {
  const supabase = getSupabase();
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  if (!user) throw new Error('NOT_AUTHENTICATED');

  // ابحث عن محادثة قائمة لنفس المستخدم والفرصة
  let query = supabase
    .from('conversations')
    .select('*')
    .eq('interested_user', user.id);
  if (opportunityId) query = query.eq('opportunity_id', String(opportunityId));
  const { data: existing } = await query.limit(1);

  if (existing && existing.length > 0) return existing[0];

  // أنشئ محادثة جديدة
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      opportunity_id: opportunityId ? String(opportunityId) : null,
      opportunity_title: opportunityTitle || null,
      interested_user: user.id,
      interested_email: user.email || null,
      status: 'open',
      handled_by_admin: true,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ---------- إرسال رسالة ----------
export async function sendMessage({ conversationId, body }) {
  const supabase = getSupabase();
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  if (!user) throw new Error('NOT_AUTHENTICATED');

  const trimmed = (body || '').trim();
  if (!trimmed) throw new Error('EMPTY_MESSAGE');

  const { masked, wasMasked } = maskContactInfo(trimmed);

  const { error } = await supabase.from('messages').insert({
    conversation_id: conversationId,
    sender_user: user.id,
    sender_role: 'interested',
    body: masked,
    body_raw: wasMasked ? trimmed : null,
    was_masked: wasMasked,
  });
  if (error) throw error;

  // حدّث آخر رسالة في المحادثة
  await supabase
    .from('conversations')
    .update({
      updated_at: new Date().toISOString(),
      last_message_at: new Date().toISOString(),
      last_message_preview: masked.slice(0, 80),
    })
    .eq('id', conversationId);

  return { wasMasked };
}

// ---------- جلب رسائل محادثة ----------
export async function getMessages(conversationId) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('messages')
    .select('id, sender_role, body, was_masked, created_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

// ---------- جلب محادثات المستخدم ----------
export async function getMyConversations() {
  const supabase = getSupabase();
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  if (!user) return [];

  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('interested_user', user.id)
    .order('updated_at', { ascending: false });
  if (error) return [];
  return data || [];
}
