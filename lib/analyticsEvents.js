export const analyticsEvents = {
  viewMarketplace: 'view_marketplace',
  viewOpportunity: 'view_opportunity',
  saveOpportunity: 'save_opportunity',
  shareOpportunity: 'share_opportunity',
  startInterest: 'start_interest',
  submitInterest: 'submit_interest',
  startNda: 'start_nda',
  submitNda: 'submit_nda',
  startProjectSubmission: 'start_project_submission',
  submitProject: 'submit_project',
  openAccount: 'open_account'
};

export function trackEvent(name, payload = {}) {
  if (typeof window === 'undefined') return;

  const event = {
    name,
    payload,
    timestamp: new Date().toISOString(),
    path: window.location.pathname
  };

  window.dispatchEvent(new CustomEvent('haraj-invest:event', { detail: event }));

  if (process.env.NODE_ENV !== 'production') {
    console.info('[HarajInvestEvent]', event);
  }
}
