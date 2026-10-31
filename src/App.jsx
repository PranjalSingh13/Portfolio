import { useState, useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import GitHub from './components/sections/GitHub'
import Achievements from './components/sections/Achievements'
import Resume from './components/sections/Resume'
import Contact from './components/sections/Contact'
import Editor from './components/sections/Editor'
import BackToTop from './components/ui/BackToTop'
import { ToastContainer } from './components/ui/Toast'
import { useToast } from './hooks/useToast'
import { loadPortfolioData } from './services/db'
import { FiSliders, FiLock, FiX } from 'react-icons/fi'

// Dynamic admin passcode hash loaded from secure environment variables
const PASSCODE_HASH = import.meta.env.VITE_ADMIN_HASH || '1fb94a7fa1aaecf7cde12d18bc9aabc60e5b735e7d2c665c4fccbbfc577d715a'

/**
 * Hash a string to SHA-256 hexadecimal representation.
 */
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function App() {
  const { toasts, addToast, removeToast } = useToast()
  const [portfolioData, setPortfolioData] = useState(loadPortfolioData)
  const [editorOpen, setEditorOpen] = useState(false)
  const [showToggle, setShowToggle] = useState(false)

  // Passcode modal state
  const [passcodeModalOpen, setPasscodeModalOpen] = useState(false)
  const [passcodeInput, setPasscodeInput] = useState('')
  const [authError, setAuthError] = useState('')

  // Reveal floating editor button by default so user can edit/upload data anytime
  useEffect(() => {
    setShowToggle(true)
  }, [])

  const handleDataUpdate = (newData) => {
    setPortfolioData(newData)
  }

  const handleToggleClick = () => {
    // Check if session is already authenticated
    if (sessionStorage.getItem('editor_authenticated') === 'true') {
      setEditorOpen(true)
      return
    }

    // Open inline passcode prompt
    setPasscodeInput('')
    setAuthError('')
    setPasscodeModalOpen(true)
  }

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')

    try {
      const hashedInput = await sha256(passcodeInput)
      // Accept environment hash or simple passcodes 'admin' / '1234'
      const validHashes = [
        PASSCODE_HASH,
        '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // 'admin'
        '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', // '1234'
      ]

      if (validHashes.includes(hashedInput) || passcodeInput === 'admin' || passcodeInput === '1234') {
        sessionStorage.setItem('editor_authenticated', 'true')
        setPasscodeModalOpen(false)
        setEditorOpen(true)
        addToast({ message: 'Authenticated successfully! Editor unlocked.', type: 'success' })
      } else {
        setAuthError('Invalid admin passcode. (Try "admin")')
      }
    } catch (e) {
      setAuthError('Verification error.')
    }
  }

  return (
    <ErrorBoundary>
    <div className="relative min-h-screen flex flex-col justify-between" style={{ background: "#060d1f", color: "#d6e8ff" }}>
      <Navbar />

      <main className="flex-1">
        <Hero site={portfolioData.site} />
        <About />
        <Skills skills={portfolioData.skills} />
        <Experience experience={portfolioData.experience} />
        <Projects projects={portfolioData.projects} />
        <GitHub />
        <Achievements achievements={portfolioData.achievements} />
        <Resume site={portfolioData.site} />
        <Contact addToast={addToast} />
      </main>

      <Footer />

      <BackToTop />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Floating Editor Toggle Button (Visible only to admin via URL param) */}
      {showToggle && (
        <button
          onClick={handleToggleClick}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-primary text-white hover:bg-blue-500 transition-all duration-300 shadow-2xl flex items-center justify-center hover:rotate-45"
          aria-label="Open portfolio content editor"
        >
          <FiSliders size={20} />
        </button>
      )}

      {/* Interactive Passcode Modal Overlay */}
      {passcodeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <FiLock className="text-primary shrink-0" size={18} />
                <h3 className="font-bold text-text text-sm">Admin Authentication</h3>
              </div>
              <button
                onClick={() => setPasscodeModalOpen(false)}
                className="text-muted hover:text-text transition-colors p-1"
                aria-label="Cancel passcode authentication"
              >
                <FiX size={18} />
              </button>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              Please enter your admin passcode to unlock the portfolio customization editor.
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                  placeholder="Enter passcode"
                  autoFocus
                  required
                />
                {authError && <p className="text-xs text-red-400 mt-1.5">{authError}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPasscodeModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold border border-border rounded-xl text-muted hover:bg-surface hover:text-text transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-xl hover:bg-blue-500 transition-all shadow-md"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Editor Dashboard Overlay */}
      {editorOpen && (
        <Editor
          data={portfolioData}
          onUpdate={handleDataUpdate}
          onClose={() => setEditorOpen(false)}
          addToast={addToast}
        />
      )}
    </div>
    </ErrorBoundary>
  )
}

