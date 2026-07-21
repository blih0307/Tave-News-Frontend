import { Link } from 'react-router-dom'
import { XIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from '../ui/SocialIcons'

const socials = [
  { label: 'X (Twitter)', href: 'https://x.com/', icon: XIcon },
  { label: 'Facebook', href: 'https://facebook.com/', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com/', icon: InstagramIcon },
  { label: 'YouTube', href: 'https://youtube.com/', icon: YouTubeIcon },
]

const sections = [
  { title: 'News', links: [{ to: '/sports', label: 'Sports' }, { to: '/africa', label: 'Africa' }, { to: '/world', label: 'World' }, { to: '/entertainment', label: 'Entertainment' }] },
  { title: 'More', links: [{ to: '/tech', label: 'Tech' }, { to: '/business', label: 'Business' }, { to: '/lifestyle', label: 'Lifestyle' }] },
  { title: 'Company', links: [{ to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }, { to: '/contact', label: 'Advertise' }] },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t-4 border-black mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-black text-xl mb-3 text-white">TAVE <span className="bg-white text-black px-1">NEWS</span></div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">Breaking news, in-depth analysis and stories that matter — from Nigeria, across Africa and around the world.</p>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-dark transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {sections.map(section => (
            <div key={section.title}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}><Link to={link.to} className="text-gray-500 text-sm hover:text-white transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Tave News. All rights reserved.</p>
          <div className="flex gap-4">
            {[
              { label: 'Privacy Policy', to: '/privacy-policy' },
              { label: 'Terms of Use', to: '/terms-of-use' },
            ].map(l => (
              <Link key={l.label} to={l.to} className="text-gray-600 text-xs hover:text-gray-400 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
