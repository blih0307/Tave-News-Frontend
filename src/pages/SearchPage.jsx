import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticles } from '../utils/api'
import ArticleCard from '../components/ui/ArticleCard'
import { ArticleSkeleton } from '../components/ui/Skeleton'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(q)

  useEffect(() => {
    if (!q) return
    setLoading(true)
    getArticles({ search: q, limit: 12 })
      .then(res => setArticles(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [q])

  const handleSearch = (e) => { e.preventDefault(); if (input.trim()) setSearchParams({ q: input.trim() }) }

  return (
    <>
      <Helmet><title>{q ? `Search: ${q}` : 'Search'} — Tave News</title></Helmet>
      <div className="bg-black py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-white font-black text-3xl mb-4">Search</h1>
          <form onSubmit={handleSearch} className="flex gap-0">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Search news..."
              className="flex-1 bg-white text-black px-5 py-3 rounded-l-xl outline-none text-sm" />
            <button type="submit" className="bg-white text-black px-6 py-3 rounded-r-xl font-bold text-sm border-l border-gray-200 hover:bg-gray-100 transition-colors">Search</button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {q && <p className="text-gray-500 text-sm mb-6">{loading ? 'Searching...' : `${articles.length} results for "${q}"`}</p>}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <ArticleSkeleton key={i} />)}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map(a => <ArticleCard key={a._id} article={a} />)}
          </div>
        ) : q ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl font-semibold mb-2">No results found</p>
            <p className="text-sm">Try different keywords</p>
          </div>
        ) : null}
      </div>
    </>
  )
}
