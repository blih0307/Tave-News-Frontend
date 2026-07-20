import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { getPageSections } from '../utils/api'

// Same pattern as PrivacyPolicy.jsx -- see that file's comment. This is a
// starting draft, not a substitute for review by a lawyer before relying
// on it, especially the liability/governing-law sections.
const DEFAULT_CONTENT = `Last updated: [DATE]

Welcome to Tave News. By accessing or using this website (the "Site"), you agree to these Terms of Use. If you don't agree with them, please don't use the Site.

## Use of the Site

You may view, read and share individual articles for personal, non-commercial use. You may not republish, redistribute, scrape, or reproduce Site content in bulk, or use it for commercial purposes, without our prior written permission.

## Intellectual Property

Original articles, text, graphics, logos and the overall design of this Site are owned by Tave News, unless otherwise noted. All rights not expressly granted here are reserved.

Images on this Site come from a mix of sources: our own photography, wire/stock photos licensed from services like Getty Images or AP (embedded directly from their platform under their license terms, not hosted or owned by us), free-to-use stock photography from sites like Unsplash or Pexels (used under those platforms' own license terms), and, occasionally, social media posts embedded directly from the original platform. In each case, rights to that image remain with its original photographer, licensor, or the platform it was embedded from — we don't claim ownership over third-party images.

If you believe an image on this Site is being used incorrectly or without proper rights, please contact us and we'll review and correct it.

## Accounts and Conduct

Most of the Site is available without an account. You agree not to use the Site to violate any law, attempt to gain unauthorized access to our systems, interfere with the Site's normal operation, or upload anything harmful (such as malware).

## Advertising

This Site displays advertising, including through Google AdSense. Advertisements are provided by third parties, and we are not responsible for the content of ads or for the products or services they promote.

## Newsletter

Signing up for our newsletter is optional and requires only an email address. You can unsubscribe at any time.

## Third-Party Links

The Site may link to other websites we don't control. We aren't responsible for the content, accuracy, or practices of any third-party site.

## Accuracy of Content

We aim to report accurately, but news and information can change quickly and errors can occur. If you believe something we've published is inaccurate, please contact us and we'll review it. Content on the Site is provided "as is" without warranties of any kind.

## Limitation of Liability

To the fullest extent permitted by law, Tave News is not liable for any indirect, incidental, or consequential damages arising from your use of the Site.

## Changes to These Terms

We may update these Terms from time to time. Continued use of the Site after changes are posted means you accept the updated Terms.

## Governing Law

These Terms are governed by the laws of the Federal Republic of Nigeria.

## Contact Us

Questions about these Terms can be sent through our Contact page.`

function renderContent(text) {
  return text.split(/\n\s*\n/).map((block, i) => {
    const trimmed = block.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('## ')) {
      return <h2 key={i} className="text-black font-black text-xl mt-10 mb-3">{trimmed.slice(3)}</h2>
    }
    return <p key={i} className="text-gray-700 text-sm leading-relaxed mb-4">{trimmed}</p>
  })
}

export default function TermsOfUse() {
  const [content, setContent] = useState(DEFAULT_CONTENT)

  useEffect(() => {
    getPageSections('terms')
      .then(res => {
        const data = res.data?.data
        if (data?.content) setContent(data.content)
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <Helmet><title>Terms of Use — Tave News</title></Helmet>
      <div className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-white font-black text-4xl sm:text-5xl mb-4">Terms of Use</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16">
        {renderContent(content)}
      </div>
    </>
  )
}