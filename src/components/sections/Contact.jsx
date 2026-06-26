import { useState } from 'react'
import AnimatedSection from '../ui/AnimatedSection'
import { FiMail, FiMapPin, FiCalendar, FiSend } from 'react-icons/fi'
import { SITE } from '../../utils/constants'
import { validateContactForm, isHoneypotTriggered } from '../../utils/validation'
import { sanitizeText } from '../../utils/sanitize'

/**
 * Contact section with frontend validation, sanitization, bot spam protection (honeypot),
 * active state triggers, and location/availability badges.
 */
export default function Contact({ addToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honeypot: '', // bot protection field
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear validation error when editing field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Bot prevention honeypot check
    if (isHoneypotTriggered(formData._honeypot)) {
      addToast({ message: 'Message sent successfully!', type: 'success' })
      setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' })
      return
    }

    // 2. Validate input fields
    const { valid, errors: validationErrors } = validateContactForm(formData)
    if (!valid) {
      setErrors(validationErrors)
      addToast({ message: 'Please correct validation errors.', type: 'error' })
      return
    }

    try {
      setLoading(true)
      // 3. Sanitize inputs to prevent HTML/XSS injection
      const submission = {
        name: sanitizeText(formData.name),
        email: sanitizeText(formData.email),
        subject: sanitizeText(formData.subject),
        message: sanitizeText(formData.message),
      }

      // Simulate network request latency (can link Formspree/EmailJS here)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      addToast({ message: 'Thank you! Your message has been received.', type: 'success' })
      setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' })
      setErrors({})
    } catch (err) {
      addToast({ message: 'Submission failed. Please try again.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-background py-24 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <span className="text-primary font-mono text-sm font-semibold tracking-wider uppercase">
            Let's Connect
          </span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Reach out for SDE internships, collaboration, or full stack opportunities.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Metadata / Direct Contact Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatedSection
              delay={0.05}
              className="bg-card border border-border p-6 rounded-2xl space-y-6"
            >
              <h3 className="text-lg font-bold text-text">Contact Information</h3>

              <div className="flex items-center gap-4 text-sm text-muted">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <FiMail size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-text uppercase tracking-wider">Email</div>
                  <a href={`mailto:${SITE.email}`} className="hover:text-primary transition-colors mt-0.5">
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted">
                <div className="p-3 bg-success/10 rounded-xl text-success">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-text uppercase tracking-wider">Location</div>
                  <div className="mt-0.5">{SITE.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted">
                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                  <FiCalendar size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-text uppercase tracking-wider">Availability</div>
                  <div className="mt-0.5">{SITE.availability}</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Validated Contact Form Column */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              <form onSubmit={handleSubmit} className="bg-card border border-border p-6 md:p-8 rounded-2xl space-y-5" noValidate>
                {/* Honeypot field (hidden from screen reader and user but visible to simple spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_honeypot">Leave this blank</label>
                  <input
                    type="text"
                    id="_honeypot"
                    name="_honeypot"
                    value={formData._honeypot}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-text focus:outline-none transition-all ${
                        errors.name ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'
                      }`}
                      placeholder="e.g. John Doe"
                      disabled={loading}
                      required
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-text focus:outline-none transition-all ${
                        errors.email ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'
                      }`}
                      placeholder="name@example.com"
                      disabled={loading}
                      required
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-text focus:outline-none transition-all ${
                      errors.subject ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'
                    }`}
                    placeholder="Briefly state your purpose"
                    disabled={loading}
                    required
                  />
                  {errors.subject && <p className="text-xs text-red-400 mt-1.5">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-text focus:outline-none transition-all resize-none ${
                      errors.message ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'
                    }`}
                    placeholder="Describe how I can support your goals"
                    disabled={loading}
                    required
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? 'Sending message...' : 'Send Message'}
                  <FiSend className="group-hover:translate-x-0.5 transition-transform duration-200" size={15} />
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
