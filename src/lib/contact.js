// Builds a mailto: link. There is no backend: the form hands the enquiry to the visitor's email app.
export function mailtoUrl({ to, subject, body }) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
