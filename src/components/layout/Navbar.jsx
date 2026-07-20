import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getNavItems } from '../../utils/api'

const defaultNav = [
  { to: '/', label: 'Home' },
  { to: '/sports', label: 'Sports' },
  { to: '/africa', label: 'Africa' },
  { to: '/world', label: 'World' },
  { to: '/entertainment', label: 'Entertainment' },
  { to: '/tech', label: 'Tech' },
  { to: '/business', label: 'Business' },
  { to: '/lifestyle', label: 'Lifestyle' },
  { to: '/opinion', label: 'Opinion' },
]

// Desktop nav item — renders a hover dropdown when the item has subnav
// links (set from the admin's Nav Manager). Items without subnav behave
// exactly like a plain link.
function DesktopNavItem({ item }) {
  const [open, setOpen] = useState(false)
  const hasSubnav = item.subnav?.length > 0

  return (
    <div
      className="relative"
      onMouseEnter={() => hasSubnav && setOpen(true)}
      onMouseLeave={() => hasSubnav && setOpen(false)}
    >
      <NavLink
        to={item.to}
        end={item.to === '/'}
        className={({ isActive }) =>
          `flex items-center gap-1 px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
            isActive ? 'text-black border-black' : 'text-gray-500 border-transparent hover:text-black hover:border-gray-400'
          }`
        }
      >
        {item.label}
        {hasSubnav && (
          <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </NavLink>

      {hasSubnav && open && (
        <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-b-lg py-2 min-w-[200px] z-50">
          {item.subnav.map(sub => (
            <NavLink
              key={sub.to}
              to={sub.to}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`
              }
            >
              {sub.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

// Mobile nav item — a plain link, or an accordion if it has subnav links.
function MobileNavItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false)
  const hasSubnav = item.subnav?.length > 0

  if (!hasSubnav) {
    return (
      <NavLink
        to={item.to}
        end={item.to === '/'}
        onClick={onNavigate}
        className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div>
      <div className="flex items-center rounded-lg hover:bg-gray-100">
        <NavLink
          to={item.to}
          end={item.to === '/'}
          onClick={onNavigate}
          className={({ isActive }) => `flex-1 px-3 py-2.5 text-sm font-medium ${isActive ? 'text-black font-bold' : 'text-gray-700'}`}
        >
          {item.label}
        </NavLink>
        <button onClick={() => setOpen(o => !o)} className="px-3 py-2.5 text-gray-400" aria-label={`Toggle ${item.label} submenu`}>
          <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="pl-4 space-y-1 py-1">
          {item.subnav.map(sub => (
            <NavLink
              key={sub.to}
              to={sub.to}
              onClick={onNavigate}
              className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-gray-100 text-black font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {sub.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [topNav, setTopNav] = useState(defaultNav)
  const navigate = useNavigate()

  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The header is `fixed`, which takes it out of document flow, so page
  // content would otherwise render underneath it. This measures the
  // header's real height (including the search bar / mobile menu toggling
  // it taller) and a spacer below reserves that exact amount of space.
  useLayoutEffect(() => {
    if (!headerRef.current) return
    const el = headerRef.current
    const measure = () => setHeaderHeight(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Nav links (including subnav dropdowns) are editable from the admin's
  // Nav Manager. If the API is unreachable or empty, we keep showing the
  // hardcoded defaults above so the header never breaks.
  useEffect(() => {
    getNavItems()
      .then(res => {
        const items = res.data?.data
        if (Array.isArray(items) && items.length > 0) setTopNav(items)
      })
      .catch(() => {})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) { navigate(`/search?q=${search}`); setSearch(''); setSearchOpen(false) }
  }

  return (
    <>
      <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${scrolled ? 'shadow-lg' : ''}`}>
        {/* Top bar */}
        <div className="bg-black text-gray-500 text-[11px] py-1">
          <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center">
            <span className="hidden sm:block">{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="flex gap-4">
              {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map(s => (
                <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-white border-b-4 border-black">
          <div className="max-w-[1600px] mx-auto px-6 py-2 flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <div className="font-black text-xl sm:text-2xl tracking-tight text-black leading-none">
                TAVE <span className="bg-black text-white px-1.5">NEWS</span>
              </div>
            </Link>

            <Link to="/contact" className="hidden md:block bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors">Subscribe</Link>

            <div className="md:hidden flex items-center gap-1">
              <button onClick={() => setSearchOpen(o => !o)} className="text-black p-1.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button className="text-black text-xl p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Bottom nav — desktop only, with hover dropdowns for subnav */}
          <div className="hidden md:block border-t border-gray-200">
            <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between gap-4">
              <div className="w-9 flex-shrink-0" />
              <nav className="flex justify-center overflow-x-auto flex-1">
                {topNav.map(item => <DesktopNavItem key={item.to} item={item} />)}
              </nav>
              <button onClick={() => setSearchOpen(o => !o)} className="w-9 flex-shrink-0 flex justify-end text-gray-400 hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>

          {/* Search bar — shared for mobile + desktop */}
          {searchOpen && (
            <div className="border-t border-gray-200 bg-gray-50">
              <div className="max-w-[1600px] mx-auto px-6 py-3">
                <form onSubmit={handleSearch} className="flex items-center gap-2 md:max-w-md md:ml-auto">
                  <input
                    autoFocus
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search news..."
                    className="flex-1 bg-white text-black px-4 py-2 rounded-lg text-sm outline-none border border-gray-300 focus:border-black"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-black text-xl px-2">✕</button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu — with expandable subnav accordions */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg max-h-[70vh] overflow-y-auto">
            <div className="px-6 py-3 space-y-1">
              {topNav.map(item => (
                <MobileNavItem key={item.to} item={item} onNavigate={() => setMenuOpen(false)} />
              ))}
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="block bg-black text-white text-center px-3 py-2.5 rounded-lg text-sm font-bold mt-2">Subscribe</Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer reserving the fixed header's height so page content
          doesn't render underneath it */}
      <div style={{ height: headerHeight }} />
    </>
  )
}