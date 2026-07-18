import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/api'

function Img({ article, className }) {
  return article.featuredImage?.url
    ? <img src={article.featuredImage.url} alt={article.title} className={className} loading="lazy" />
    : <div className={`${className} bg-gray-200 flex items-center justify-center text-gray-400 text-xs`}>No Image</div>
}

export function SectionTitle({ title, to, light = false, accent = false }) {
  return (
    <div className={`flex items-center justify-between mb-5 ${accent ? 'border-l-4 border-secondary pl-3' : `pb-1.5 border-b ${light ? 'border-zinc-700' : 'border-gray-200'}`}`}>
      <h2 className={`text-xs font-black uppercase tracking-widest ${light ? 'text-white' : 'text-black'}`}>{title}</h2>
      {to && (
        <Link to={to} className={`text-xs font-semibold transition-colors ${light ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-black'}`}>
          See all ›
        </Link>
      )}
    </div>
  )
}

export function Meta({ article, light = false }) {
  return (
    <p className="text-xs mt-1.5 flex items-center gap-1.5">
      <span className="text-zinc-400">{timeAgo(article.publishedAt)}</span>
      {article.category?.name && (
        <>
          <span className="opacity-30">·</span>
          <span className={`font-bold uppercase tracking-wide text-[10px] ${light ? 'text-zinc-300' : 'text-zinc-600'}`}>{article.category.name}</span>
        </>
      )}
    </p>
  )
}

export function FeaturedCard({ article, large = false, light = false, overlay = false }) {
  if (overlay) {
    return (
      <Link to={`/article/${article.slug}`} className="group relative block overflow-hidden rounded-lg">
        <Img article={article} className={`w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ${large ? 'h-56 sm:h-72' : 'h-44'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`font-serif font-bold leading-snug text-white group-hover:underline line-clamp-3 ${large ? 'text-lg sm:text-xl' : 'text-sm'}`}>{article.title}</h3>
          <Meta article={article} light />
        </div>
      </Link>
    )
  }
  return (
    <Link to={`/article/${article.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg">
        <Img article={article} className={`w-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ${large ? 'h-52 sm:h-64 lg:h-72' : 'h-40 sm:h-44'}`} />
      </div>
      <div className="pt-2">
        <h3 className={`font-serif font-bold leading-snug group-hover:underline line-clamp-3 ${large ? 'text-xl sm:text-2xl' : 'text-sm'} ${light ? 'text-white' : 'text-gray-900'}`}>{article.title}</h3>
        {article.excerpt && <p className={`text-sm mt-1 line-clamp-2 ${light ? 'text-zinc-400' : 'text-gray-500'}`}>{article.excerpt}</p>}
        <Meta article={article} light={light} />
      </div>
    </Link>
  )
}

export function StoryRow({ article, light = false }) {
  return (
    <Link to={`/article/${article.slug}`} className={`flex items-start gap-3 py-4 border-b group last:border-0 ${light ? 'border-zinc-700' : 'border-gray-200'}`}>
      <Img article={article} className="w-28 h-20 object-cover object-center shrink-0 rounded" />
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold leading-snug group-hover:underline line-clamp-3 mb-2 ${light ? 'text-white' : 'text-gray-900'}`}>{article.title}</h4>
        <p className={`text-xs ${light ? 'text-zinc-400' : 'text-gray-400'}`}>
          {timeAgo(article.publishedAt)}
          {article.category?.name && <span className="ml-2 pl-2 border-l border-gray-300 font-semibold uppercase tracking-wide text-[10px]">{article.category.name}</span>}
        </p>
      </div>
    </Link>
  )
}

export function TextStoryRow({ article, index, light = false, numbered = false }) {
  return (
    <Link to={`/article/${article.slug}`} className={`flex items-start gap-3 py-3 border-b group last:border-0 ${light ? 'border-zinc-700' : 'border-gray-100'}`}>
      {numbered && (
        <span className="text-2xl font-black leading-none mt-0.5 shrink-0 w-8 text-right" style={{ color: light ? '#555' : '#e0e0e0' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold leading-snug group-hover:underline line-clamp-3 ${light ? 'text-white' : 'text-gray-900'}`}>{article.title}</h4>
        {article.excerpt && <p className={`text-xs mt-0.5 line-clamp-2 ${light ? 'text-zinc-500' : 'text-gray-500'}`}>{article.excerpt}</p>}
        <Meta article={article} light={light} />
      </div>
    </Link>
  )
}