import { useState } from 'react'
import AnimatedSection from '../ui/AnimatedSection'
import { FiMail, FiMapPin, FiCalendar, FiSend } from 'react-icons/fi'
import { SITE } from '../../utils/constants'
import { validateContactForm, isHoneypotTriggered } from '../../utils/validation'
import { sanitizeText } from '../../utils/sanitize'

const LABEL = { color: '#00b4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }

/**
 * Contact section — dark navy glassmorphism dashboard style.
 */
export default function Contact({ addToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', _honeypot: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isHoneypotTriggered(formData._honeypot)) {
      addToast({ message: 'Message sent successfully!', type: 'success' })
      setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' })
      return
    }
    const { valid, errors: validationErrors } = validateContactForm(formData)
    if (!valid) {
      setErrors(validationErrors)
      addToast({ message: 'Please correct validation errors.', type: 'error' })
      return
    }
    try {
      setLoading(true)
      const submission = {
        name: sanitizeText(formData.name),
        email: sanitizeText(formData.email),
        subject: sanitizeText(formData.subject),
        message: sanitizeText(formData.message),
      }
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
      const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
      if (endpoint || web3Key) {
        let url = endpoint
        let payload = { ...submission }
        if (web3Key) {
          url = url || 'https://api.web3forms.com/submit'
          payload.access_key = web3Key
          payload.botcheck = ''
          payload.from_name = submission.name
          payload.replyto = submission.email
        }
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        })
        const result = await response.json().catch(() => ({}))
        if (!response.ok || (web3Key && !result.success)) throw new Error(result.message || 'Server error.')
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        throw new Error('Email service not configured.')
      }
      addToast({ message: 'Thank you! Your message has been received.', type: 'success' })
      setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' })
      setErrors({})
    } catch (err) {
      addToast({ message: err.message || 'Submission failed. Please try again.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%',
    background: 'rgba(8, 20, 41, 0.85)',
    border: `1px solid ${hasError ? 'rgba(248,113,113,0.5)' : 'rgba(20, 45, 90, 0.9)'}`,
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    color: '#d6e8ff',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.25s ease',
  })

  const contactItems = [
    { icon: <FiMail size={18} />, label: 'Email', value: SITE.email, color: '#00b4ff', href: `mailto:${SITE.email}` },
    { icon: <FiMapPin size={18} />, label: 'Location', value: SITE.location, color: '#34d399' },
    { icon: <FiCalendar size={18} />, label: 'Availability', value: SITE.availability, color: '#a78bfa' },
  ]

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: '#060d1f', borderBottom: '1px solid rgba(0, 180, 255, 0.08)', paddingTop: '6rem', paddingBottom: '6rem' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', left: '10%', top: '20%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0, 85, 204, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <span style={LABEL}>{"Let's Connect"}</span>
          <h2 className="section-title mt-2">Get In Touch</h2>
          <p className="section-subtitle">Reach out for SDE internships, collaboration, or full stack opportunities.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <AnimatedSection delay={0.05}>
              <div
                className="rounded-2xl p-6 space-y-5"
                style={{
                  background: 'rgba(8, 20, 41, 0.9)',
                  border: '1px solid rgba(0, 180, 255, 0.1)',
                }}
              >
                <h3 className="text-lg font-bold" style={{ color: '#d6e8ff' }}>Contact Information</h3>
                {contactItems.map(({ icon, label, value, color, href }) => (
                  <div key={label} className="flex items-center gap-4 text-sm">
                    <div
                      className="p-3 rounded-xl shrink-0"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#d6e8ff' }}>{label}</div>
                      {href
                        ? <a href={href} className="transition-colors" style={{ color: '#6b9acf' }}
                            onMouseEnter={e => e.currentTarget.style.color = color}
                            onMouseLeave={e => e.currentTarget.style.color = '#6b9acf'}
                          >{value}</a>
                        : <div style={{ color: '#6b9acf' }}>{value}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 md:p-8 space-y-5"
                style={{
                  background: 'rgba(8, 20, 41, 0.9)',
                  border: '1px solid rgba(0, 180, 255, 0.1)',
                }}
                noValidate
              >
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="_honeypot" value={formData._honeypot} onChange={handleChange} tabIndex="-1" autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. John Doe' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'name@example.com' },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b9acf' }}>
                        {label}
                      </label>
                      <input
                        type={type} id={id} name={id}
                        value={formData[id]} onChange={handleChange}
                        style={inputStyle(!!errors[id])}
                        placeholder={placeholder}
                        disabled={loading} required
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(0, 180, 255, 0.45)'
                          e.target.style.boxShadow = '0 0 0 3px rgba(0, 180, 255, 0.08)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = errors[id] ? 'rgba(248,113,113,0.5)' : 'rgba(20, 45, 90, 0.9)'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                      {errors[id] && <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>{errors[id]}</p>}
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b9acf' }}>Subject</label>
                  <input
                    type="text" id="subject" name="subject"
                    value={formData.subject} onChange={handleChange}
                    style={inputStyle(!!errors.subject)}
                    placeholder="Briefly state your purpose"
                    disabled={loading} required
                    onFocus={e => { e.target.style.borderColor = 'rgba(0, 180, 255, 0.45)'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 180, 255, 0.08)' }}
                    onBlur={e => { e.target.style.borderColor = errors.subject ? 'rgba(248,113,113,0.5)' : 'rgba(20, 45, 90, 0.9)'; e.target.style.boxShadow = 'none' }}
                  />
                  {errors.subject && <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b9acf' }}>Message</label>
                  <textarea
                    id="message" name="message" rows="5"
                    value={formData.message} onChange={handleChange}
                    style={{ ...inputStyle(!!errors.message), resize: 'none' }}
                    placeholder="Describe how I can support your goals"
                    disabled={loading} required
                    onFocus={e => { e.target.style.borderColor = 'rgba(0, 180, 255, 0.45)'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 180, 255, 0.08)' }}
                    onBlur={e => { e.target.style.borderColor = errors.message ? 'rgba(248,113,113,0.5)' : 'rgba(20, 45, 90, 0.9)'; e.target.style.boxShadow = 'none' }}
                  />
                  {errors.message && <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>{errors.message}</p>}
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Sending...' : 'Send Message'}
                  <FiSend size={15} />
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
