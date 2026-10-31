import { FiCpu, FiDatabase, FiNavigation, FiZap } from 'react-icons/fi'

/**
 * VisionDomainTable — Mimics "Sales by Country" table card in the Vision UI Pro dashboard.
 * Shows key engineering domains, project hours, tech stack, and reliability metrics.
 */
export default function VisionDomainTable() {
  const domains = [
    {
      name: 'Full Stack & AI Systems',
      subtitle: 'AgriConnect & Gemini AI',
      icon: <FiCpu className="text-cyan-400" size={16} />,
      badgeBg: 'rgba(0, 212, 255, 0.15)',
      hours: '4,500 hrs',
      stack: 'React • Node • Gemini',
      efficiency: '98.5%',
    },
    {
      name: 'Custom Database & Engine',
      subtitle: 'StructDB & B-Tree Parser',
      icon: <FiDatabase className="text-purple-400" size={16} />,
      badgeBg: 'rgba(168, 85, 247, 0.15)',
      hours: '3,900 hrs',
      stack: 'Python • ACID • SQL',
      efficiency: '99.4%',
    },
    {
      name: 'Real-Time WebSockets',
      subtitle: 'MyRideShare Live Fleet',
      icon: <FiNavigation className="text-emerald-400" size={16} />,
      badgeBg: 'rgba(52, 211, 153, 0.15)',
      hours: '2,400 hrs',
      stack: 'Socket.io • Geo • JWT',
      efficiency: '97.2%',
    },
    {
      name: 'Distributed Scrapers & APIs',
      subtitle: 'Price Comparison Pro',
      icon: <FiZap className="text-amber-400" size={16} />,
      badgeBg: 'rgba(251, 191, 36, 0.15)',
      hours: '1,850 hrs',
      stack: 'Flask • Cache • BS4',
      efficiency: '95.8%',
    },
  ]

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white tracking-wide">Domain Mastery</h4>
          <p className="text-xs text-[#8fa0dd]">Core architectural specializations</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#0075FF]/20 border border-[#0075FF]/30 text-[11px] font-mono text-cyan-300">
          4 DOMAINS
        </span>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase font-mono tracking-wider text-[#6b9acf]">
              <th className="pb-2 font-medium">Domain</th>
              <th className="pb-2 font-medium text-center">Volume</th>
              <th className="pb-2 font-medium">Stack</th>
              <th className="pb-2 font-medium text-right">Uptime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {domains.map((d, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors group">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                      style={{ background: d.badgeBg }}
                    >
                      {d.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {d.name}
                      </div>
                      <div className="text-[11px] text-[#6b9acf]">{d.subtitle}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-2 text-center font-mono text-[#d6e8ff] font-medium">
                  {d.hours}
                </td>

                <td className="py-3 px-2">
                  <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded-md inline-block">
                    {d.stack}
                  </span>
                </td>

                <td className="py-3 pl-2 text-right">
                  <span className="font-mono font-semibold text-[#01B574]">
                    {d.efficiency}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
