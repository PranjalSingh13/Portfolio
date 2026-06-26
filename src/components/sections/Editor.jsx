import { useState } from 'react'
import { FiX, FiPlus, FiTrash2, FiSave, FiCopy, FiRefreshCw, FiEdit2 } from 'react-icons/fi'
import { savePortfolioData, resetPortfolioData, formatDataAsJsFile } from '../../services/db'

/**
 * Premium Live Editor Dashboard.
 * Allows adding, editing, and deleting items with a live preview and code export options.
 */
export default function Editor({ data, onUpdate, onClose, addToast }) {
  const [activeTab, setActiveTab] = useState('projects')
  const [editedData, setEditedData] = useState({ ...data })

  const handleSave = () => {
    const success = savePortfolioData(editedData)
    if (success) {
      onUpdate(editedData)
      addToast({ message: 'Changes saved locally! Real-time changes applied.', type: 'success' })
    } else {
      addToast({ message: 'Failed to save changes.', type: 'error' })
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to discard all custom edits and reset to file defaults?')) {
      resetPortfolioData()
      // reload page or restore state from fresh import
      window.location.reload()
    }
  }

  const copyToClipboard = (text, fileName) => {
    navigator.clipboard.writeText(text)
    addToast({ message: `${fileName} code copied to clipboard! Paste it into the file.`, type: 'success' })
  }

  // --- Projects Editor Handlers ---
  const updateProjectField = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }))
  }

  const addProject = () => {
    const newProj = {
      id: Date.now(),
      title: 'New Project',
      subtitle: 'Project tagline',
      period: '2026',
      stack: ['React', 'Node.js'],
      github: '',
      live: '',
      color: '#2563EB',
      problem: 'Describe the problem this project addresses.',
      solution: 'Explain your development approach.',
      highlights: ['Key milestone feature here'],
      challenges: 'Describe engineering difficulties you resolved.',
      featured: true,
    }
    setEditedData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }))
  }

  const deleteProject = (id) => {
    setEditedData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }

  // --- Experience Editor Handlers ---
  const updateExperienceField = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      role: 'Internship Role',
      company: 'Company/Incubator Name',
      project: 'Project Context',
      type: 'Internship',
      period: 'Jun 2026 — Present',
      location: 'Remote / Hybrid',
      stack: ['React', 'Node.js'],
      color: '#2563EB',
      highlights: ['Contributed to API endpoint creation and database schema layouts'],
    }
    setEditedData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }))
  }

  const deleteExperience = (id) => {
    setEditedData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }))
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-3xl bg-card border-l border-border h-full flex flex-col justify-between shadow-2xl">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/30">
          <div>
            <h2 className="text-lg font-bold text-text flex items-center gap-2">
              <FiEdit2 className="text-primary" /> Live Portfolio Editor
            </h2>
            <p className="text-xs text-muted mt-0.5">Click sections to modify. Save to update instantly.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted hover:text-text hover:bg-surface transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="Close editor dashboard"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Editor Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Tab Selection */}
          <div className="flex border-b border-border overflow-x-auto no-scrollbar gap-2 pb-1">
            {['projects', 'experience', 'site', 'export'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:text-text'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-text">Manage Projects</h3>
                <button
                  onClick={addProject}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <FiPlus size={14} /> Add Project
                </button>
              </div>

              <div className="space-y-6">
                {editedData.projects.map((proj) => (
                  <div key={proj.id} className="p-5 border border-border bg-surface/20 rounded-xl space-y-4 relative">
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="absolute top-4 right-4 p-2 rounded-lg text-muted hover:text-red-400 hover:bg-surface transition-colors"
                      aria-label="Delete project"
                    >
                      <FiTrash2 size={16} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProjectField(proj.id, 'title', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={proj.subtitle}
                          onChange={(e) => updateProjectField(proj.id, 'subtitle', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Period</label>
                        <input
                          type="text"
                          value={proj.period}
                          onChange={(e) => updateProjectField(proj.id, 'period', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">GitHub Link</label>
                        <input
                          type="text"
                          value={proj.github || ''}
                          onChange={(e) => updateProjectField(proj.id, 'github', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Live Link</label>
                        <input
                          type="text"
                          value={proj.live || ''}
                          onChange={(e) => updateProjectField(proj.id, 'live', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Problem Statement</label>
                      <textarea
                        value={proj.problem}
                        onChange={(e) => updateProjectField(proj.id, 'problem', e.target.value)}
                        rows="2"
                        className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Solution</label>
                      <textarea
                        value={proj.solution}
                        onChange={(e) => updateProjectField(proj.id, 'solution', e.target.value)}
                        rows="2"
                        className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-text">Manage Experience</h3>
                <button
                  onClick={addExperience}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <FiPlus size={14} /> Add Experience
                </button>
              </div>

              <div className="space-y-6">
                {editedData.experience.map((exp) => (
                  <div key={exp.id} className="p-5 border border-border bg-surface/20 rounded-xl space-y-4 relative">
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="absolute top-4 right-4 p-2 rounded-lg text-muted hover:text-red-400 hover:bg-surface transition-colors"
                      aria-label="Delete experience"
                    >
                      <FiTrash2 size={16} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Role / Job Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperienceField(exp.id, 'role', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperienceField(exp.id, 'company', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Period (Dates)</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperienceField(exp.id, 'period', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperienceField(exp.id, 'location', e.target.value)}
                          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: SITE CONFIG */}
          {activeTab === 'site' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-text">Site Parameters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Developer Name</label>
                  <input
                    type="text"
                    value={editedData.site.name}
                    onChange={(e) => setEditedData({ ...editedData, site: { ...editedData.site, name: e.target.value } })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Title Role</label>
                  <input
                    type="text"
                    value={editedData.site.title}
                    onChange={(e) => setEditedData({ ...editedData, site: { ...editedData.site, title: e.target.value } })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Email</label>
                  <input
                    type="text"
                    value={editedData.site.email}
                    onChange={(e) => setEditedData({ ...editedData, site: { ...editedData.site, email: e.target.value } })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-muted mb-1">Availability Tag</label>
                  <input
                    type="text"
                    value={editedData.site.availability}
                    onChange={(e) => setEditedData({ ...editedData, site: { ...editedData.site, availability: e.target.value } })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CODE EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-text">Sync with Workspace Source Files</h3>
              <p className="text-xs text-muted leading-relaxed">
                When you make visual changes here, they are stored in your browser. To make them permanent in your code, copy these snippets and overwrite the contents in your project workspace.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono text-primary font-semibold">src/data/projects.js</span>
                    <button
                      onClick={() => copyToClipboard(formatDataAsJsFile(editedData.projects, 'PROJECTS'), 'projects.js')}
                      className="inline-flex items-center gap-1 text-[10px] text-muted hover:text-primary transition-colors font-semibold"
                    >
                      <FiCopy /> Copy code
                    </button>
                  </div>
                  <pre className="bg-surface/50 border border-border p-3 rounded-lg overflow-x-auto max-h-40 text-[10px] text-muted/80 no-scrollbar">
                    {formatDataAsJsFile(editedData.projects, 'PROJECTS')}
                  </pre>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono text-primary font-semibold">src/data/experience.js</span>
                    <button
                      onClick={() => copyToClipboard(formatDataAsJsFile(editedData.experience, 'EXPERIENCE'), 'experience.js')}
                      className="inline-flex items-center gap-1 text-[10px] text-muted hover:text-primary transition-colors font-semibold"
                    >
                      <FiCopy /> Copy code
                    </button>
                  </div>
                  <pre className="bg-surface/50 border border-border p-3 rounded-lg overflow-x-auto max-h-40 text-[10px] text-muted/80 no-scrollbar">
                    {formatDataAsJsFile(editedData.experience, 'EXPERIENCE')}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Editor Actions Footer */}
        <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-between gap-3 shrink-0">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-border text-muted hover:text-text hover:bg-surface text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FiRefreshCw size={14} /> Reset Defaults
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-blue-500 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
          >
            <FiSave size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
