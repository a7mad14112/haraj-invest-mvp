'use client';

import { useSearchParams } from 'next/navigation';
import { InterestForm } from '../../components/Forms';
import { fallbackOpportunities } from '../../lib/opportunityFallback';

function findOpportunity(slug) {
  if (!slug) return null;
  return fallbackOpportunities.find((item) => item.slug === slug) || { slug, title: slug };
}

export default function ContactClient() {
  const searchParams = useSearchParams();
  const opportunitySlug = searchParams.get('opportunity');
  const opportunityContext = findOpportunity(opportunitySlug);

  return (
    <div className="card form-card">
      <div className="lead-context-note-v77">
          اختر نوع الاهتمام واكتب رسالة واضحة. الطلبات المحددة أسهل في المتابعة من الرسائل العامة.
        </div>

        <InterestForm opportunityContext={opportunityContext} />
    </div>
  );
}
