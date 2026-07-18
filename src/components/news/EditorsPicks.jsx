import { FeaturedCard, TextStoryRow, SectionTitle } from './NewsPrimitives'

export default function EditorsPicks({ articles = [] }) {
  const items = articles.slice(0, 4)
  if (!items.length) return null
  return (
    <section style={{ backgroundColor: '#0a0a0a' }} className="-mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 py-10">
      <div className="max-w-[1600px] mx-auto">
        <SectionTitle title="Editor's Picks" light />
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
          {items.map(a => <FeaturedCard key={a._id} article={a} light overlay />)}
        </div>
        <div className="lg:hidden divide-y divide-zinc-800">
          {items.map((a, i) => <TextStoryRow key={a._id} article={a} index={i} light />)}
        </div>
      </div>
    </section>
  )
}