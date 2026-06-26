/**
 * Validate contact form fields.
 * Returns { valid: boolean, errors: Record<string, string> }
 */
export function validateContactForm({ name, email, subject, message }) {
  const errors = {}

  const trimmedName = (name || '').trim()
  const trimmedEmail = (email || '').trim()
  const trimmedSubject = (subject || '').trim()
  const trimmedMessage = (message || '').trim()

  if (!trimmedName) {
    errors.name = 'Name is required.'
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (trimmedName.length > 80) {
    errors.name = 'Name must be under 80 characters.'
  }

  if (!trimmedEmail) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!trimmedSubject) {
    errors.subject = 'Subject is required.'
  } else if (trimmedSubject.length < 4) {
    errors.subject = 'Subject must be at least 4 characters.'
  } else if (trimmedSubject.length > 120) {
    errors.subject = 'Subject must be under 120 characters.'
  }

  if (!trimmedMessage) {
    errors.message = 'Message is required.'
  } else if (trimmedMessage.length < 20) {
    errors.message = 'Message must be at least 20 characters.'
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message must be under 2000 characters.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

/**
 * Detect honeypot field being filled (bot detection).
 */
export function isHoneypotTriggered(honeypotValue) {
  return Boolean(honeypotValue && honeypotValue.trim())
}
