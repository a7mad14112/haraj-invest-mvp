# v7.2 Stability & Due Diligence UX Upgrade Audit

PASS: v7.2 audit passed. Marketplace/detail stability repaired. Due diligence panel added. No risky alias imports.

## Scope

- Rewrites MarketplaceClient for stable filters/result UX.
- Rewrites OpportunityDetailClient to remove duplicate share buttons.
- Adds DueDiligencePanel.
- No SQL migration.
- No Supabase/Auth/Admin logic changes.
