import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticles, getCategories } from '../utils/api'
import ArticleCard from '../components/ui/ArticleCard'
import AdBanner from '../components/ui/AdBanner'
import SidebarWidget from '../components/ui/SidebarWidget'
import { ArticleSkeleton } from '../components/ui/Skeleton'
import NotFound from './NotFound'

const CATEGORY_MAP = {
  nigeria: 'Nigeria', africa: 'Africa', world: 'World',
  entertainment: 'Entertainment', tech: 'Tech',
  business: 'Business', lifestyle: 'Lifestyle', opinion: 'Opinion',
}

export default function CategoryPage() {
  const location = useLocation()
  // Use the last path segment as the lookup slug -- a subnav link can be
  // nested (e.g. /world/africa), but categories themselves only ever have
  // a flat, single-segment slug, so the parent prefix is purely cosmetic.
  const segments = location.pathname.split('/').filter(Boolean)
  const categorySlug = segments[segments.length - 1] || ''
  const catName = CATEGORY_MAP[categorySlug] || categorySlug
  const [allCategories, setAllCategories] = useState([])
  const [category, setCategory] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => { window.scrollTo(0, 0); setLoading(true); setNotFound(false); setPage(1) }, [categorySlug])

  useEffect(() => {
    getCategories().then(res => setAllCategories(res.data.data || [])).catch(console.error)
  }, [])

  // Articles are fetched scoped to this category's _id — previously this
  // page fetched every article unfiltered, so every category page (Nigeria,
  // Africa, World, ...) showed the exact same list.
  useEffect(() => {
    if (allCategories.length === 0) return
    const match = allCategories.find(c => c.slug === categorySlug)
    if (!match) { setNotFound(true); setLoading(false); return }
    setCategory(match)
    getArticles({ category: match._id, limit: 12, page })
      .then(res => { setArticles(res.data.data || []); setTotalPages(res.data.pages || 1) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [allCategories, categorySlug, page])

  if (notFound) return <NotFound />

  return (
    <>
      <Helmet>
        <title>{catName} News — Tave News</title>
        <meta name="description" content={`Latest ${catName} news, breaking stories and analysis from Tave News.`} />
      </Helmet>

      <div className=" py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>›</span>
            <span className="text-black- ">{catName}</span>
          </div>
          {/* <h1 className="text-white font-black text-4xl">{catName}</h1>
          <div className="w-16 h-1 bg-white mt-3" /> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdBanner slotKey="slot_category_leaderboard" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-8">
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => <ArticleSkeleton key={i} />)}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-xl font-semibold mb-2">No articles yet</p>
                <p className="text-sm">Check back soon for the latest {catName} news.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {articles.map(a => <ArticleCard key={a._id} article={a} />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                      className="px-5 py-2.5 bg-black text-white rounded-xl disabled:opacity-40 hover:bg-gray-800 transition-all text-sm font-bold">← Prev</button>
                    <span className="px-5 py-2.5 text-sm text-gray-500">Page {page} of {totalPages}</span>
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                      className="px-5 py-2.5 bg-black text-white rounded-xl disabled:opacity-40 hover:bg-gray-800 transition-all text-sm font-bold">Next →</button>
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="space-y-8">
            <AdBanner size="rectangle" slotKey="slot_category_sidebar_rectangle" />
            <SidebarWidget title="More News" />
            <div>
              <div className="border-t-4 border-black pt-3 mb-4">
                <h3 className="font-black text-black uppercase tracking-wide text-sm">Sections</h3>
              </div>
              <div className="space-y-1">
                {Object.entries(CATEGORY_MAP).map(([slug, name]) => (
                  <Link key={slug} to={`/${slug}`}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      categorySlug === slug ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                    }`}>
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
