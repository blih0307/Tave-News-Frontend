import { Link } from 'react-router-dom'
import { timeAgo, cardImage, cardEmbedHtml } from '../../utils/api'
import EmbedHtml from './EmbedHtml'

// Shared thumbnail renderer: a responsive embed takes priority when set,
// then a regular image, then a plain placeholder block. className should
// include sizing (w-full h-full and similar).
// For big/full-width displays (hero slots) — unlike CardThumb, this
// prioritizes the full-size photo over a card-sized thumbnail, so a hero
// never renders a small image stretched across a tall hero box.
export function HeroThumb({ article, className, placeholderClass, placeholderText }) {
  const fi = article?.featuredImage
  const embedHtml = fi?.embedHtml || fi?.thumbnailEmbedHtml
  if (embedHtml) return <div className={className}><EmbedHtml html={embedHtml} className="w-full h-full" /></div>
  const img = fi?.url || fi?.thumbnailUrl
  if (img) return <img src={img} alt={article.title} className={className} />
  return <div className={placeholderClass || className}>{placeholderText}</div>
}

export function CardThumb({ article, className, placeholderClass, placeholderText }) {
  const embedHtml = cardEmbedHtml(article)
  if (embedHtml) return <div className={className}><EmbedHtml html={embedHtml} className="w-full h-full" /></div>
  const img = cardImage(article)
  if (img) return <img src={img} alt={article.title} className={className} />
  return <div className={placeholderClass || className}>{placeholderText}</div>
}

export default function ArticleCard({ article, variant = 'default', hideCategory = false }) {
  if (!article) return null

  if (variant === 'featured') return (
    <Link to={`/article/${article.slug}`} className="group block relative isolate overflow-hidden rounded-xl bg-dark">
      <div className="relative aspect-video bg-surface overflow-hidden">
        <HeroThumb
          article={article}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          placeholderClass="w-full h-full bg-gradient-to-br from-surface to-gray-900 flex items-center justify-center text-gray-500 text-sm"
          placeholderText="No Image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
        {article.isBreaking && <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block">BREAKING</span>}
        <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block ml-1">{article.category?.name}</span>
        <h2 className="text-white font-bold text-xl leading-tight group-hover:underline transition-colors line-clamp-2">{article.title}</h2>
        <p className="text-gray-400 text-sm mt-1">{timeAgo(article.publishedAt)}</p>
      </div>
    </Link>
  )

  if (variant === 'horizontal') return (
    <Link to={`/article/${article.slug}`} className="group flex gap-3 hover:bg-surface rounded-lg p-2 -mx-2 transition-colors">
      <div className="w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <CardThumb
          article={article}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          placeholderClass="w-full h-full bg-gray-200"
        />
      </div>
      <div className="flex-1 min-w-0">
        {!hideCategory && <span className="bg-primary text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded inline-block mb-1">{article.category?.name}</span>}
        <h3 className="text-gray-900 text-sm font-semibold leading-tight line-clamp-2 group-hover:underline transition-colors">{article.title}</h3>
        <p className="text-gray-400 text-xs mt-1">{timeAgo(article.publishedAt)}</p>
      </div>
    </Link>
  )

  return (
    <Link to={`/article/${article.slug}`} className="group block">
      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-3">
        <CardThumb
          article={article}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          placeholderClass="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center text-gray-400 text-xs"
          placeholderText="No Image"
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {article.isBreaking && <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded inline-block">BREAKING</span>}
          {!hideCategory && <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded inline-block">{article.category?.name}</span>}
        </div>
        <h3 className="text-gray-900 font-bold leading-snug line-clamp-2 group-hover:underline transition-colors">{article.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>
        <div className="text-xs text-secondary">{timeAgo(article.publishedAt)}</div>
      </div>
    </Link>
  )
}
