// lib/sanitizeHtml.ts
import htmlSanitizer from "sanitize-html";

/**
 * Sanitizes admin/CMS-authored HTML (Terms & Conditions body, announcement
 * banner text, etc.) before it's rendered via dangerouslySetInnerHTML.
 *
 * This content comes from Django admin, not end users, but is still run
 * through an allowlist-based sanitizer as defense in depth — in case an
 * admin account is ever compromised or a future editor pastes raw HTML.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  return htmlSanitizer(html ?? "", {
    // sanitize-html's default list already covers headings, paragraphs,
    // lists, tables, blockquotes, and basic formatting — it just leaves
    // out <img> by default, so that's added explicitly.
    allowedTags: htmlSanitizer.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...htmlSanitizer.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
    },
    // Blocks javascript:/data: URIs in href/src — only these schemes pass.
    allowedSchemes: ["http", "https", "mailto"],
  });
}
