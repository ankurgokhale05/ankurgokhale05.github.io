// Visitor stats via GoatCounter (cookie-free, no personal data).
// Dashboard: https://ankurgokhale05.goatcounter.com — the code is set in index.html.

// Records a named event, e.g. track('resume-open', 'Résumé opened').
// Does nothing if the counter script hasn't loaded or is blocked.
export function track(name, title = name) {
  try {
    window.goatcounter?.count({ path: name, title, event: true });
  } catch {
    // Analytics must never break the page.
  }
}
