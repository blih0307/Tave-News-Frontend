import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { getPageSections } from '../utils/api'
import { MailIcon, XIcon, FacebookIcon, MapPinIcon } from '../components/ui/SocialIcons'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState({
    hero_title: 'Contact Us',
    hero_subtitle: 'Story tips, advertising enquiries or just want to say hi?',
    email: 'hello@tavenews.com',
  })

  // Hero copy and contact email are editable from the admin (Pages ->
  // Contact). Falls back to the defaults above if the API is unreachable.
  useEffect(() => {
    getPageSections('contact')
      .then(res => {
        const data = res.data?.data
        if (data && Object.keys(data).length) setContent(c => ({ ...c, ...data }))
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    setTimeout(() => { toast.success('Message sent!'); setForm({ name: '', email: '', subject: '', message: '' }); setLoading(false) }, 1000)
  }
  return (
    <>
      <Helmet><title>Contact Us — Tave News</title></Helmet>
      <div className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-white font-black text-5xl mb-4">{content.hero_title}</h1>
          <p className="text-gray-400 text-lg">{content.hero_subtitle}</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            {[
              { Icon: MailIcon, label: 'Email', value: content.email },
              { Icon: XIcon, label: 'X (Twitter)', value: '@TaveNews' },
              { Icon: FacebookIcon, label: 'Facebook', value: 'Tave News' },
              { Icon: MapPinIcon, label: 'Location', value: 'Lagos, Nigeria' },
            ].map(item => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                  <item.Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-black font-semibold text-sm">{item.label}</div>
                  <div className="text-gray-500 text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[{ key: 'name', label: 'Full Name', type: 'text', ph: 'John Doe' }, { key: 'email', label: 'Email', type: 'email', ph: 'john@example.com' }].map(f => (
                <div key={f.key}>
                  <label className="text-black text-xs font-bold uppercase tracking-widest block mb-2">{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph} required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="text-black text-xs font-bold uppercase tracking-widest block mb-2">Subject</label>
              <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="What's this about?" required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors" />
            </div>
            <div>
              <label className="text-black text-xs font-bold uppercase tracking-widest block mb-2">Message</label>
              <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={6} required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors resize-none" />
            </div>
            <button type="submit" disabled={loading} className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
