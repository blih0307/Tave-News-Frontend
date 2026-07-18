import { FeaturedCard, StoryRow, TextStoryRow, SectionTitle } from './NewsPrimitives'

export default function CategorySection({ category, articles = [], layoutIndex = 0 }) {
  const [featured, second, third] = articles
  if (!featured) return null
  const layout = layoutIndex % 4

  if (layout === 0) {
    return (
      <section>
        <SectionTitle title={category.name} to={`/${category.slug}`} />
        <div className="hidden lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6">
          <FeaturedCard article={featured} large overlay />
          <div className="flex flex-col divide-y divide-gray-100">
            {[second, third].filter(Boolean).map((a, i) => <TextStoryRow key={a._id} article={a} index={i + 1} numbered />)}
          </div>
        </div>
        <div className="lg:hidden">
          <FeaturedCard article={featured} overlay />
          <div className="mt-2 divide-y divide-gray-100">{articles.slice(1, 4).map(a => <StoryRow key={a._id} article={a} />)}</div>
        </div>
      </section>
    )
  }
  if (layout === 1) {
    return (
      <section>
        <SectionTitle title={category.name} to={`/${category.slug}`} />
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
          {[featured, second, third].filter(Boolean).map(a => <FeaturedCard key={a._id} article={a} overlay />)}
        </div>
        <div className="lg:hidden">
          <FeaturedCard article={featured} overlay />
          <div className="mt-2 divide-y divide-gray-100">{articles.slice(1, 4).map(a => <StoryRow key={a._id} article={a} />)}</div>
        </div>
      </section>
    )
  }
  if (layout === 2) {
    return (
      <section>
        <SectionTitle title={category.name} to={`/${category.slug}`} accent />
        <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:gap-6">
          <div className="flex flex-col divide-y divide-gray-100">
            {[second, third].filter(Boolean).map((a, i) => <TextStoryRow key={a._id} article={a} index={i + 1} numbered />)}
          </div>
          <FeaturedCard article={featured} large overlay />
        </div>
        <div className="lg:hidden">
          <FeaturedCard article={featured} overlay />
          <div className="mt-2 divide-y divide-gray-100">{articles.slice(1, 4).map(a => <StoryRow key={a._id} article={a} />)}</div>
        </div>
      </section>
    )
  }
  return (
    <section style={{ backgroundColor: '#111' }} className="-mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 py-10">
      <div className="max-w-[1600px] mx-auto">
        <SectionTitle title={category.name} to={`/${category.slug}`} light />
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
          {[featured, second, third].filter(Boolean).map(a => <FeaturedCard key={a._id} article={a} light overlay />)}
        </div>
        <div className="lg:hidden divide-y divide-zinc-700">
          {articles.slice(0, 4).map((a, i) => <TextStoryRow key={a._id} article={a} index={i} light />)}
        </div>
      </div>
    </section>
  )
}