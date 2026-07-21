import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticle, getRelated } from '../utils/api'
import { canonicalUrl, SITE_URL } from '../utils/seo'
import ArticleCard from '../components/ui/ArticleCard'
import AdBanner from '../components/ui/AdBanner'
import EmbedHtml from '../components/ui/EmbedHtml'
import Newsletter from '../components/ui/Newsletter'
import ShareButtons from '../components/ui/ShareButtons'
import SidebarWidget from '../components/ui/SidebarWidget'
import { ArticleSkeleton } from '../components/ui/Skeleton'

const formatDateTime = (date) => date ? new Date(date).toLocaleString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
}) : ''

// Splits the article's HTML content into paragraph-level chunks so an
// AdBanner can be dropped in between groups of paragraphs.
function chunkContent(html, perChunk = 3) {
  if (!html) return []
  const parts = html.split(/(<\/p>)/i)
  const paragraphs = []
  let buffer = ''
  for (const part of parts) {
    buffer += part
    if (/<\/p>$/i.test(part)) {
      paragraphs.push(buffer)
      buffer = ''
    }
  }
  if (buffer.trim()) paragraphs.push(buffer)
  if (paragraphs.length === 0) return [html]

  const chunks = []
  for (let i = 0; i < paragraphs.length; i += perChunk) {
    chunks.push(paragraphs.slice(i, i + perChunk).join(''))
  }
  return chunks
}

// The admin editor's "embed" toolbar button inserts a
// <div class="ql-embed-block" data-embed-html="...">...</div> placeholder
// into the article body wherever an editor drops in an embed snippet
// mid-article. dangerouslySetInnerHTML never executes the <script> tags
// inside that stored snippet, so this splits each chunk around those
// placeholder divs and renders a live <EmbedHtml> in their place instead.
// Matches the admin's <tave-embed> block (see InlineEmbedBlot in
// ArticleEditor.jsx). This used to match a generic <div>, but that
// collided with Quill's paste handling: any pasted plain <div> (which is
// how Word/Google Docs/many sites wrap ordinary paragraphs) was getting
// misidentified as an embed block. The admin now writes a distinct,
// hyphenated custom tag that real paste sources never produce, so this
// regex was updated to match it specifically instead. IMPORTANT: this same
// admin is shared across both the news and sports sites (via the
// Sports/News toggle in the sidebar) -- the tag name must stay identical
// here and in the sports frontend's copy of this regex, or embeds inserted
// while editing an article for this site will silently fail to render.
const EMBED_BLOCK_RE = /<tave-embed[^>]*\sdata-embed-html="([^"]*)"[^>]*>[\s\S]*?<\/tave-embed>/g

function splitEmbeds(html) {
  const segments = []
  let lastIndex = 0
  let match
  EMBED_BLOCK_RE.lastIndex = 0
  while ((match = EMBED_BLOCK_RE.exec(html)) !== null) {
    if (match.index > lastIndex) segments.push({ type: 'html', value: html.slice(lastIndex, match.index) })
    segments.push({ type: 'embed', value: decodeURIComponent(match[1]) })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < html.length) segments.push({ type: 'html', value: html.slice(lastIndex) })
  return segments
}

export default function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [navHeight, setNavHeight] = useState(0)

  useEffect(() => {
    const header = document.querySelector('header')
    if (!header) return
    const measure = () => setNavHeight(header.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(header)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setError(false)
    getArticle(slug)
      .then(res => {
        setArticle(res.data.data)
        return getRelated(res.data.data._id)
      })
      .then(res => setRelated(res.data.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
          {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />)}
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <ArticleSkeleton key={i} />)}
        </div>
      </div>
    </div>
  )

  if (error || !article) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-black text-black mb-4">404</h1>
      <h2 className="text-2xl font-black text-dark mb-3">Article not found</h2>
      <Link to="/" className="text-black font-semibold hover:underline">← Back to home</Link>
    </div>
  )

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const contentChunks = chunkContent(article.content, 3)

  return (
    <>
      <Helmet>
        <title>{article.seo?.metaTitle || article.title} — Tave News</title>
        <meta name="description" content={article.seo?.metaDescription || article.excerpt} />

        {/* Social preview cards (Facebook/X) -- image tags only render when
            there's a real image, so a missing image gives a plain
            text-link preview instead of a broken image card. */}
        {(() => {
          const shareImage = article.featuredImage?.url || article.featuredImage?.thumbnailUrl
          return (
            <>
              <meta property="og:title" content={article.title} />
              <meta property="og:description" content={article.seo?.metaDescription || article.excerpt} />
              {shareImage && <meta property="og:image" content={shareImage} />}
              <meta property="og:url" content={`${SITE_URL}/article/${article.slug}`} />
              <meta property="og:type" content="article" />
              <meta property="og:site_name" content="Tave News" />

              <meta name="twitter:card" content={shareImage ? 'summary_large_image' : 'summary'} />
              <meta name="twitter:title" content={article.title} />
              <meta name="twitter:description" content={article.seo?.metaDescription || article.excerpt} />
              {shareImage && <meta name="twitter:image" content={shareImage} />}
            </>
          )
        })()}

        <link rel="canonical" href={canonicalUrl(`/article/${article.slug}`)} />

        {/* NewsArticle structured data -- this is what makes an article
            eligible for Google's rich article cards / Top Stories carousel
            / Google News, on top of plain text indexing. */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            description: article.seo?.metaDescription || article.excerpt,
            image: [article.featuredImage?.url || article.featuredImage?.thumbnailUrl].filter(Boolean),
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
            author: article.author?.name ? [{ '@type': 'Person', name: article.author.name }] : undefined,
            publisher: {
              '@type': 'Organization',
              name: 'Tave News',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(`/article/${article.slug}`) },
          })}
        </script>
      </Helmet>

      {/* Sticky category bar — shows which section this article belongs to */}
      {article.category?.name && (
        <div
          className="sticky z-40 bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between"
          style={{ top: navHeight }}
        >
          <span className="text-white font-black text-sm uppercase tracking-widest">{article.category.name} News</span>
          {article.category.slug && (
            <Link
              to={`/${article.category.slug}`}
              className="text-xs font-bold text-gray-400 hover:text-white hover:underline flex items-center gap-1"
            >
              More News →
            </Link>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Article */}
          <article className="lg:col-span-2">
            <h1 className="text-dark font-bold text-2xl md:text-3xl leading-tight mb-3">{article.title}</h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-5">{article.subheading || article.excerpt}</p>

            {/* Author + date/time */}
            <div className="flex items-center justify-between flex-wrap gap-2 py-4 border-y border-gray-200 mb-6">
              <p className="text-sm text-gray-600">
                {article.source
                  ? <>By <span className="font-bold text-dark">{article.source}</span></>
                  : <>Posted by <span className="font-bold text-dark">{article.author?.name}</span></>}
              </p>
              <p className="text-sm text-gray-400">{formatDateTime(article.publishedAt)}</p>
            </div>

            {/* Featured Image — edge-to-edge on mobile, contained + rounded on desktop */}
            {article.featuredImage?.embedHtml ? (
              <figure className="-mx-4 sm:-mx-6 lg:mx-0 mb-6 flex flex-col items-center">
                <EmbedHtml html={article.featuredImage.embedHtml} className="w-full" />
                {article.featuredImage.credit && (
                  <figcaption className="w-full text-center text-gray-500 text-xs mt-1.5 px-4 sm:px-6 lg:px-0">
                    {article.featuredImage.credit}
                  </figcaption>
                )}
              </figure>
            ) : article.featuredImage?.url && (
              <figure className="-mx-4 sm:-mx-6 lg:mx-0 mb-6">
                <img
                  src={article.featuredImage.url}
                  alt={article.featuredImage.alt || article.title}
                  className="w-full aspect-video lg:rounded-xl object-cover"
                />
                {article.featuredImage.credit && (
                  <figcaption className="text-gray-500 text-xs mt-1.5 px-4 sm:px-6 lg:px-0">
                    {article.featuredImage.credit}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Share icons under the image */}
            <div className="mb-6">
              <ShareButtons title={article.title} url={shareUrl} />
            </div>

            {/* Content, with an ad dropped between every few paragraphs, and
                any inline embed placeholders swapped for live embeds */}
            <div className="article-content">
              {contentChunks.map((chunk, i) => (
                <div key={i}>
                  {splitEmbeds(chunk).map((seg, j) =>
                    seg.type === 'embed' ? (
                      <figure key={j} className="-mx-4 sm:-mx-6 lg:mx-0 my-6 flex justify-center">
                        <EmbedHtml html={seg.value} className="w-full" />
                      </figure>
                    ) : (
                      seg.value.trim() && <div key={j} dangerouslySetInnerHTML={{ __html: seg.value }} />
                    )
                  )}
                  {i < contentChunks.length - 1 && (
                    <div className="my-6">
                      <AdBanner size="leaderboard" slotKey="slot_article_incontent" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Embedded Video */}
            {article.embeddedVideo && (
              <div className="mt-8">
                <div className="border-t-4 border-dark pt-3 mb-4">
                  <h3 className="font-black text-dark uppercase tracking-wide text-sm">Watch</h3>
                </div>
                <div className="aspect-video rounded-xl overflow-hidden bg-dark">
                  <iframe src={article.embeddedVideo} className="w-full h-full" allowFullScreen title="Video" />
                </div>
              </div>
            )}

            {/* Tags */}
            {article.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Link key={tag} to={`/search?q=${tag}`}
                      className="bg-gray-100 hover:bg-primary hover:text-white text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium transition-colors">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share — kept as-is, includes copy link */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Share this article</div>
              <ShareButtons title={article.title} url={shareUrl} />
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="mt-10">
                <div className="border-t-4 border-dark pt-3 mb-6">
                  <h2 className="font-black text-dark uppercase tracking-wide">Related Stories</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map(a => <ArticleCard key={a._id} article={a} />)}
                </div>
              </div>
            )}

            <div className="mt-10">
              <Newsletter />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdBanner size="rectangle" slotKey="slot_article_sidebar_rectangle" />
            <SidebarWidget title="Trending Now" />
            <AdBanner size="square" slotKey="slot_article_sidebar_square" />
            <SidebarWidget title="More News" />
          </aside>
        </div>
      </div>
    </>
  )
}
