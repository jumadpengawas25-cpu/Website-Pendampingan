import { news } from "../data.js";

export default function NewsSection() {
  return (
    <section className="py-stack-lg bg-surface" id="news">
      <div className="max-w-container-max-width mx-auto px-margin-desktop">
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-lg text-primary">Berita &amp; Informasi</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Update terbaru mengenai kebijakan pendidikan, pengumuman kedinasan,
            dan artikel edukatif untuk tenaga pendidik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({ item }) {
  return (
    <article className="flex flex-col gap-4 group">
      <div className="aspect-video rounded-xl overflow-hidden relative">
        <img
          alt={item.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={item.image}
        />
        <div className="absolute top-4 left-4">
          <span
            className={`text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-widest ${item.tag.class}`}
          >
            {item.tag.text}
          </span>
        </div>
      </div>
      <div>
        <p className="text-label-sm text-on-surface-variant mb-2">
          {`${item.date} • ${item.author}`}
        </p>
        <h3 className="font-title-md text-primary group-hover:text-secondary-container transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-body-md text-on-surface-variant line-clamp-3 mt-2">
          {item.excerpt}
        </p>
      </div>
    </article>
  );
}
