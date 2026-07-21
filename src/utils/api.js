import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const getArticles = (params = {}) => api.get('/articles', { params })
export const getArticle = (slug) => api.get(`/articles/${slug}`)
export const getRelated = (id) => api.get(`/articles/${id}/related`)
export const getCategories = () => api.get('/categories')
export const subscribe = (email) => api.post('/newsletter/subscribe', { email })
export const getNavItems = () => api.get('/nav-items')
export const getPageSections = (page) => api.get(`/page-sections/${page}`)
export const getHomeFeed = (params = {}) => api.get('/articles/feed/home', { params })

// Regular image on the article: the small thumbnail if one's been
// uploaded, else the full featured image, else nothing.
export const cardImage = (entity) => entity?.featuredImage?.thumbnailUrl || entity?.featuredImage?.url || ''
// Responsive embed (e.g. SmartFrame) for card/list views, if the article
// has one -- takes priority over cardImage when set.
//
// IMPORTANT: do NOT fall back to the full featuredImage.embedHtml here.
// That was tried and reverted -- Getty and SmartFrame widgets don't
// gracefully shrink to fit a small card; they detect the constrained
// size and refuse to render at all (SmartFrame shows its own literal
// "This image cannot be fully rendered on this page" error box in that
// case), which looks far worse than the plain placeholder below. The
// real fix for an article whose only image is an embed is to also set a
// dedicated card Thumbnail in the admin -- see the warning in
// ArticleEditor.jsx's embed mode.
export const cardEmbedHtml = (entity) => entity?.featuredImage?.thumbnailEmbedHtml || ''

export const formatDate = (date) => new Date(date).toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric'
})

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return formatDate(date)
}

export const truncate = (str, n) => str?.length > n ? str.slice(0, n) + '...' : str
export const readTime = (content = '') => {
  const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}