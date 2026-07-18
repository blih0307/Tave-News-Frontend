import { Link } from 'react-router-dom'

export default function SectionHeader({ title, to }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2.5">
        <span className="w-1.5 h-6 bg-black inline-block" />
        <h2 className="font-black text-black uppercase tracking-wide text-lg">{title}</h2>
      </div>
      {to && <Link to={to} className="text-gray-400 text-sm hover:text-black hover:underline">See all →</Link>}
    </div>
  )
}