import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/api'
import SecondaryCard from './SecondaryCard'

export default function MoreNewsGrid({ articles = [] }) {
  if (!articles.length) return null
  const [first, ...rest] = articles

  return (
    <div>
      {/* Desktop: 4 equal cards, BBC-style */}
      <div className="hidden md:grid md:grid-cols-4 gap-6 border-t-2 border-black pt-5">
        {articles.slice(0, 4).map(a => (
          <Link key={a._id} to={`/article/${a.slug}`} className="group block">
            <div className="h-[150px] rounded-lg overflow-hidden bg-gray-200 mb-3">
              {a.featuredImage?.url
                ? <img src={a.featuredImage.url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Image</div>
              }
            </div>
            <h4 className="font-serif font-bold text-base leading-snug line-clamp-2 group-hover:underline mb-1.5">{a.title}</h4>
            <p className="text-gray-500 text-sm line-clamp-2 mb-1">{a.excerpt}</p>
            <p className="text-gray-400 text-xs">{timeAgo(a.publishedAt)}</p>
          </Link>
        ))}
      </div>

      {/* Mobile: first article big, rest compact rows */}
      <div className="md:hidden">
        <Link to={`/article/${first.slug}`} className="group block mb-5">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 mb-3">
            {first.featuredImage?.url
              ? <img src={first.featuredImage.url} alt={first.title} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-gray-200" />
            }
          </div>
          <h4 className="font-serif font-bold text-lg leading-snug group-hover:underline mb-1">{first.title}</h4>
          <p className="text-gray-500 text-sm line-clamp-2">{first.excerpt}</p>
        </Link>
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {rest.slice(0, 3).map(a => (
            <div key={a._id} className="py-4">
              <SecondaryCard article={a} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}