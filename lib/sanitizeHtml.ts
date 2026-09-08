import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(html: string | null | undefined): string {
  return DOMPurify.sanitize(html ?? "", {
    USE_PROFILES: { html: true },
  });
}
