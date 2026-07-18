import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/api'

export default function SectionFeed({ articles = [] }) {
  if (!articles.length) return null
  const [first, ...rest] = articles

  return (
    <div>
      <Link to={`/article/${first.slug}`} className="group block mb-6">
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 mb-3">
          {first.featuredImage?.url
            ? <img src={first.featuredImage.url} alt={first.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">No Image</div>
          }
        </div>
        <span className="inline-block bg-black text-white text-xs font-black px-3 py-1 uppercase tracking-wide mb-2">
          {first.category?.name}
        </span>
        <h3 className="font-black text-xl leading-snug group-hover:underline mb-1.5">{first.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{first.excerpt}</p>
        <p className="text-gray-400 text-xs mt-2">{timeAgo(first.publishedAt)}</p>
      </Link>

      {rest.length > 0 && (
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {rest.map(a => (
            <Link key={a._id} to={`/article/${a.slug}`} className="group block py-4">
              <h4 className="font-bold text-sm leading-snug group-hover:underline mb-1">{a.title}</h4>
              <p className="text-gray-400 text-xs">{timeAgo(a.publishedAt)} · {a.category?.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}