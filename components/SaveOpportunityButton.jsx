'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'haraj-invest-saved-opportunities';

function readSaved() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeSaved(items) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('haraj-saved-opportunities-changed'));
}

export function getSavedOpportunities() {
  return readSaved();
}

export function clearSavedOpportunities() {
  writeSaved([]);
}

export function removeSavedOpportunity(slug) {
  const saved = readSaved().filter((item) => item.slug !== slug);
  writeSaved(saved);
  return saved;
}

export default function SaveOpportunityButton({ opportunity, className = '' }) {
  const slug = opportunity?.slug || opportunity?.id;
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setSaved(readSaved().some((item) => item.slug === slug));
  }, [slug]);

  function toggleSave() {
    if (!slug) return;

    const current = readSaved();
    const exists = current.some((item) => item.slug === slug);

    if (exists) {
      const next = current.filter((item) => item.slug !== slug);
      writeSaved(next);
      setSaved(false);
      return;
    }

    const nextItem = {
      slug,
      title: opportunity.title || 'فرصة محفوظة',
      sector: opportunity.sector || 'غير محدد',
      city: opportunity.city || 'غير محدد',
      type: opportunity.type || opportunity.opportunity_type || 'غير محدد',
      value: opportunity.value || opportunity.asking_value || 'غير معلن',
      summary: opportunity.summary || opportunity.description || 'فرصة محفوظة للرجوع إليها لاحقًا.',
      saved_at: new Date().toISOString()
    };

    writeSaved([nextItem, ...current.filter((item) => item.slug !== slug)].slice(0, 24));
    setSaved(true);
  }

  return (
    <button
      type="button"
      className={`btn ${saved ? 'btn-primary saved-button-v51 saved' : 'btn-secondary saved-button-v51'} ${className}`}
      onClick={toggleSave}
      aria-pressed={saved}
    >
      {saved ? 'محفوظة' : 'حفظ الفرصة'}
    </button>
  );
}
