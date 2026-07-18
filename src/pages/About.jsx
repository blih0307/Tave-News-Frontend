import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { getPageSections } from '../utils/api'

export default function About() {
  const [content, setContent] = useState({
    hero_title: 'About Tave News',
    hero_subtitle: 'Breaking news and stories that matter — from Nigeria, Africa and the world.',
    who_we_are: 'Tave News is a digital media platform delivering fast, accurate and engaging news coverage across Nigeria, Africa and the world. We believe in journalism that informs, challenges and empowers — covering politics, business, entertainment, tech and lifestyle with integrity.',
    write_for_us_title: 'Write For Us',
    write_for_us_body: "Are you a journalist, writer or expert in your field? We'd love to hear from you.",
  })

  // Editable from the admin (Pages -> About). Falls back to the defaults
  // above if the API is unreachable.
  useEffect(() => {
    getPageSections('about')
      .then(res => {
        const data = res.data?.data
        if (data && Object.keys(data).length) setContent(c => ({ ...c, ...data }))
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <Helmet><title>About Us — Tave News</title></Helmet>
      <div className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-white font-black text-5xl mb-4">{content.hero_title}</h1>
          <p className="text-gray-400 text-lg">{content.hero_subtitle}</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-black font-black text-2xl mb-4 border-b-4 border-black pb-2">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{content.who_we_are}</p>
          </div>
          <div>
            <h2 className="text-black font-black text-2xl mb-4 border-b-4 border-black pb-2">What We Cover</h2>
            <ul className="space-y-3">
              {['Nigeria — Politics, economy, security', 'Africa — Pan-African news and stories', 'World — International news and analysis', 'Entertainment — Music, film, celebrity', 'Tech — Innovation and digital economy', 'Business — Markets, startups, finance'].map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-black font-bold mt-0.5">→</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 border-l-4 border-black rounded-r-2xl p-8">
          <h2 className="text-black font-black text-2xl mb-3">{content.write_for_us_title}</h2>
          <p className="text-gray-500 mb-6">{content.write_for_us_body}</p>
          <a href="/contact" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all inline-block">Get in Touch</a>
        </div>
      </div>
    </>
  )
}
