'use client';

import { useState } from 'react';

function getOpportunityUrl(slug) {
  if (typeof window === 'undefined') return `/opportunity/${slug}`;
  return `${window.location.origin}/opportunity/${slug}`;
}

export default function ShareOpportunityButton({ opportunity, className = '' }) {
  const [copied, setCopied] = useState(false);
  const slug = opportunity?.slug || opportunity?.id;
  const title = opportunity?.title || 'فرصة تجارية في حراج إنڤست';

  async function handleShare() {
    if (!slug) return;

    const url = getOpportunityUrl(slug);
    const text = `${title} — حراج إنڤست`;

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      } catch {
        setCopied(false);
      }
    }
  }

  return (
    <button
      type="button"
      className={`btn btn-secondary share-button-v61 ${copied ? 'copied' : ''} ${className}`}
      onClick={handleShare}
    >
      {copied ? 'تم نسخ الرابط' : 'مشاركة'}
    </button>
  );
}
