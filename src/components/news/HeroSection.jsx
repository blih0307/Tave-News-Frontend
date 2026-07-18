import { Link } from 'react-router-dom'
import { timeAgo, readTime } from '../../utils/api'

export default function HeroSection({ hero, side }) {
  return (
    <section>
      <div className="hidden lg:flex lg:items-start lg:gap-6">
        <div className="flex flex-col gap-4 w-[22%] shrink-0">
          {side.slice(0, 2).map(a => (
            <Link key={a._id} to={`/article/${a.slug}`} className="group block border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="w-full h-28 rounded overflow-hidden bg-gray-200 mb-2">
                {a.featuredImage?.url ? <img src={a.featuredImage.url} alt={a.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200" />}
              </div>
              <h4 className="text-sm font-serif font-bold leading-snug text-gray-900 group-hover:underline line-clamp-2 mb-1.5">{a.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">{a.excerpt}</p>
              <p className="text-xs text-gray-400">{timeAgo(a.publishedAt)} · {a.category?.name?.toUpperCase()}</p>
            </Link>
          ))}
        </div>

        <div className="flex-1 h-[480px] relative rounded-lg overflow-hidden">
          <Link to={`/article/${hero.slug}`} className="group block absolute inset-0">
            {hero.featuredImage?.url ? <img src={hero.featuredImage.url} alt={hero.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-300" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-2xl xl:text-3xl font-serif font-bold leading-tight text-white group-hover:underline line-clamp-2">{hero.title}</h2>
              <p className="text-sm text-zinc-200 mt-2 leading-relaxed line-clamp-2">{hero.excerpt}</p>
              <p className="text-xs text-gray-300 mt-2">{timeAgo(hero.publishedAt)} · {readTime(hero.content)} min read</p>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-4 w-[22%] shrink-0">
          {side.slice(2, 7).map(a => (
            <Link key={a._id} to={`/article/${a.slug}`} className="group block border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <h4 className="text-sm font-serif font-bold leading-snug text-gray-900 group-hover:underline line-clamp-2 mb-1.5">{a.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">{a.excerpt}</p>
              <p className="text-xs text-gray-400">{timeAgo(a.publishedAt)} · {a.category?.name?.toUpperCase()}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="lg:hidden -mx-4 sm:-mx-6">
        <Link to={`/article/${hero.slug}`} className="group block relative">
          <div className="w-full h-[420px] sm:h-[500px] bg-gray-200">
            {hero.featuredImage?.url ? <img src={hero.featuredImage.url} alt={hero.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-300" />}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-0.5 mb-2">{hero.category?.name}</span>
            <h2 className="text-2xl font-serif font-bold leading-snug text-white group-hover:underline line-clamp-2">{hero.title}</h2>
            <p className="text-sm text-zinc-300 mt-2 leading-relaxed line-clamp-2">{hero.excerpt}</p>
            <p className="text-xs text-gray-300 mt-2">{timeAgo(hero.publishedAt)} · {readTime(hero.content)} min read</p>
          </div>
        </Link>
        <div className="px-4 sm:px-6 divide-y divide-gray-100">
          {side.slice(0, 4).map(a => (
            <Link key={a._id} to={`/article/${a.slug}`} className="group flex gap-3 py-4">
              <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                {a.featuredImage?.url ? <img src={a.featuredImage.url} alt={a.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-bold text-sm leading-snug line-clamp-2 group-hover:underline mb-1">{a.title}</h4>
                <p className="text-gray-400 text-xs">{timeAgo(a.publishedAt)} · {a.category?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}