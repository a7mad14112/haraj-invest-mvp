'use client';

import { useSearchParams } from 'next/navigation';
import { NdaForm } from '../../components/Forms';
import { fallbackOpportunities } from '../../lib/opportunityFallback';

function findOpportunity(slug) {
  if (!slug) return null;
  return fallbackOpportunities.find((item) => item.slug === slug) || { slug, title: slug };
}

export default function NdaRequestClient() {
  const searchParams = useSearchParams();
  const opportunitySlug = searchParams.get('opportunity');
  const opportunityContext = findOpportunity(opportunitySlug);

  return (
    <div className="card form-card">
      <div className="nda-context-note-v78">
          وضّح لماذا تحتاج السرية، وما نوع المعلومات التي ترغب في مراجعتها بعد NDA.
        </div>

        <NdaForm opportunityContext={opportunityContext} />
    </div>
  );
}
