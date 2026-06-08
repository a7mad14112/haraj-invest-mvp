'use client';

import Link from 'next/link';
import ShareOpportunityButton from './ShareOpportunityButton';
import SaveOpportunityButton from './SaveOpportunityButton';

export default function OpportunityStickyCTA({ opportunity }) {
  if (!opportunity?.slug) return null;

  return (
    <div className="opp-sticky-cta-v70" aria-label="إجراءات الفرصة">
      <div className="opp-sticky-cta-info-v70">
        <b>{opportunity.title}</b>
        <span>{opportunity.city || 'السعودية'} · {opportunity.sector || 'فرصة تجارية'}</span>
      </div>

      <div className="opp-sticky-cta-actions-v70">
        <Link className="btn btn-primary" href={`/contact?opportunity=${opportunity.slug}`}>أرسل اهتمامك</Link>
        <Link className="btn btn-secondary" href={`/nda-request?opportunity=${opportunity.slug}`}>NDA</Link>
        <SaveOpportunityButton opportunity={opportunity} />
        <ShareOpportunityButton opportunity={opportunity} />
      </div>
    </div>
  );
}
