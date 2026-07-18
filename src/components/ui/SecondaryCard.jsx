import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/api'

export default function SecondaryCard({ article }) {
  if (!article) return null
  return (
    <Link to={`/article/${article.slug}`} className="group flex flex-row md:flex-col gap-3 md:gap-0">
      <div className="w-24 h-20 md:w-full md:h-[160px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 md:mb-3">
        {article.featuredImage?.url
          ? <img src={article.featuredImage.url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Image</div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold md:font-serif text-sm md:text-base leading-snug line-clamp-2 group-hover:underline mb-1">
          {article.title}
        </h4>
        <p className="text-gray-400 text-xs">{timeAgo(article.publishedAt)} · {article.category?.name}</p>
      </div>
    </Link>
  )
}