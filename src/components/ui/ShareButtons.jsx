import { XIcon, FacebookIcon, WhatsAppIcon, LinkIcon } from './SocialIcons'
import toast from 'react-hot-toast'

export default function ShareButtons({ title, url }) {
  const shareUrl = url || window.location.href
  const encoded = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title || document.title)

  const buttons = [
    { label: 'X', icon: XIcon, href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}` },
    { label: 'Facebook', icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { label: 'WhatsApp', icon: WhatsAppIcon, href: `https://wa.me/?text=${encodedTitle}%20${encoded}` },
  ]

  const handleCopy = () => { navigator.clipboard.writeText(shareUrl); toast.success('Link copied!') }

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}
          className="flex items-center gap-2 bg-black text-white text-xs font-semibold pl-3 pr-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <Icon className="w-3.5 h-3.5" />
          {label}
        </a>
      ))}
      <button onClick={handleCopy} aria-label="Copy link"
        className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold pl-3 pr-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
        <LinkIcon className="w-3.5 h-3.5" />
        Copy Link
      </button>
    </div>
  )
}
