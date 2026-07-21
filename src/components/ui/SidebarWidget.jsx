import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getArticles, timeAgo } from '../../utils/api'
import { CardThumb } from './ArticleCard'
import { HorizontalSkeleton } from './Skeleton'

export default function SidebarWidget({ title = 'More News', limit = 5 }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticles({ limit })
      .then(res => setArticles(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="border-t-4 border-black pt-3 mb-4">
        <h3 className="font-black text-black uppercase tracking-wide text-sm">{title}</h3>
      </div>
      <div className="space-y-3">
        {loading
          ? [...Array(limit)].map((_, i) => <HorizontalSkeleton key={i} />)
          : articles.map(article => (
            <Link key={article._id} to={`/article/${article.slug}`} className="group flex gap-3 hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
              <div className="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <CardThumb
                  article={article}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  placeholderClass="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="bg-primary text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded inline-block">{article.category?.name}</span>
                <h4 className="text-gray-900 text-sm font-semibold leading-snug line-clamp-2 group-hover:underline transition-colors mt-1">{article.title}</h4>
                <span className="text-gray-400 text-xs">{timeAgo(article.publishedAt)}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
