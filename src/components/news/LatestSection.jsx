import { FeaturedCard, StoryRow, SectionTitle } from './NewsPrimitives'

export default function LatestSection({ articles = [] }) {
  const top4 = articles.slice(0, 4)
  if (!top4.length) return null
  return (
    <section>
      <SectionTitle title="Latest Stories" accent />
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
        {top4.map(a => <FeaturedCard key={a._id} article={a} overlay />)}
      </div>
      <div className="lg:hidden divide-y divide-gray-100">
        {top4.map(a => <StoryRow key={a._id} article={a} />)}
      </div>
    </section>
  )
}