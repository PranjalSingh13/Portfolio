/**
 * Sanitize a string to prevent XSS / HTML injection.
 * Escapes dangerous HTML characters before rendering.
 * Never use dangerouslySetInnerHTML with user input.
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Strip all HTML tags from a string.
 */
export function stripHtml(input) {
  if (typeof input !== 'string') return ''
  return input.replace(/<[^>]*>/g, '')
}

/**
 * Truncate a string to maxLength with ellipsis.
 */
export function truncate(str, maxLength = 100) {
  if (typeof str !== 'string') return ''
  return str.length > maxLength ? str.slice(0, maxLength) + '…' : str
}
