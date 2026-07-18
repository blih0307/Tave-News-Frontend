import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import Analytics from './components/Analytics'
import { MonetizationProvider } from './context/MonetizationContext'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'
import CategoryPage from './pages/CategoryPage'
import SearchPage from './pages/SearchPage'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <MonetizationProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catches both top-level category paths (/world) and any nested
                subnav path (/world/africa, /business/markets/oil, ...) --
                CategoryPage looks the page up by its LAST path segment, so a
                subnav link's parent prefix is just cosmetic in the URL. Static
                routes above always win the match over this, regardless of
                declaration order, since React Router ranks static segments
                higher than dynamic ones. */}
            <Route path="/:seg/*" element={<CategoryPage />} />
            <Route path="/:seg" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </MonetizationProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#111111', color: '#fff', border: '1px solid #ffffff' },
          success: { iconTheme: { primary: '#ffffff', secondary: '#111111' } },
        }}
      />
    </BrowserRouter>
  )
}
