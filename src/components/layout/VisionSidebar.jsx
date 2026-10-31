import { FiHome, FiFolder, FiCpu, FiBriefcase, FiGithub, FiAward, FiMail, FiFileText, FiX } from 'react-icons/fi'
import { LINKS } from '../../utils/constants'

export default function VisionSidebar({ activeTab, setActiveTab, isOpen, onClose }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboards', icon: <FiHome size={17} /> },
    { id: 'projects', label: 'Projects', icon: <FiFolder size={17} /> },
    { id: 'skills', label: 'Skills & Stack', icon: <FiCpu size={17} /> },
    { id: 'experience', label: 'Experience', icon: <FiBriefcase size={17} /> },
    { id: 'github', label: 'GitHub Activity', icon: <FiGithub size={17} /> },
    { id: 'achievements', label: 'Achievements', icon: <FiAward size={17} /> },
    { id: 'contact', label: 'Contact', icon: <FiMail size={17} /> },
  ]

  const handleNavClick = (id) => {
    setActiveTab(id)
    if (onClose) onClose()
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Glass Card Shell */}
        <div className="w-full h-full rounded-3xl p-4 flex flex-col justify-between bg-gradient-to-b from-[#060B26]/95 via-[#0A0E23]/90 to-[#060B26]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden relative">
          {/* Subtle Top Glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

          {/* Top Brand Header */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0075FF] to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
                  <span className="font-extrabold text-sm tracking-wider font-mono">P</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-wider text-white font-display">
                    VISION UI <span className="text-cyan-400 font-mono text-xs">PRO</span>
                  </h2>
                  <p className="text-[10px] text-[#6b9acf] font-mono">Pranjal Singh • SDE</p>
                </div>
              </div>

              {/* Close button on mobile */}
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="mt-5 space-y-1.5">
              <p className="text-[10px] font-semibold text-[#6b9acf]/70 uppercase tracking-widest px-3 mb-2 font-mono">
                PAGES
              </p>
              {navItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 text-left ${
                      isActive
                        ? 'bg-[#0075FF] text-white shadow-lg shadow-[#0075FF]/40 font-bold'
                        : 'text-[#8fa0dd] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-white/20 text-white shadow-inner'
                          : 'bg-[#0F1535] text-[#0075FF] border border-white/5'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Bottom Card: "Need help? / Documentation" style card from screenshot */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#0F1535] to-[#0A1640] border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-cyan-400/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="w-8 h-8 rounded-xl bg-[#0075FF] flex items-center justify-center text-white mb-2.5 shadow-md shadow-blue-500/40">
              <FiFileText size={15} />
            </div>

            <h5 className="text-xs font-bold text-white mb-0.5">Need Portfolio PDF?</h5>
            <p className="text-[10px] text-[#8fa0dd] mb-3 leading-relaxed">
              Check complete resume & credentials.
            </p>

            <a
              href={LINKS.resume}
              download="PranjalSingh_Resume.pdf"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#0075FF] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 transition-all uppercase tracking-wider"
            >
              DOWNLOAD RESUME
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
