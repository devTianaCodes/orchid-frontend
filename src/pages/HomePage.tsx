import { Link } from "react-router-dom";

const heroImageUrl =
  "https://images.unsplash.com/photo-1571677179476-ab32559a6c7c?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=3000";

const learningHighlights = [
  {
    title: "Beginner friendly",
    text: "Clear care cues for light, water, roots, and seasonal rhythm.",
  },
  {
    title: "Care-focused profiles",
    text: "Each orchid includes practical growing notes and detail pages.",
  },
  {
    title: "Real orchid photos",
    text: "Profiles use real images with documented sources.",
  },
  {
    title: "Local favorites",
    text: "Save orchids in your browser for quick return visits.",
  },
];

export function HomePage() {
  return (
    <section
      className="relative isolate flex min-h-screen overflow-hidden bg-ink text-white"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(36, 76, 46, 0.95) 0%, rgba(36, 76, 46, 0.74) 28%, rgba(36, 76, 46, 0.26) 58%, rgba(36, 76, 46, 0.1) 100%), radial-gradient(ellipse at center, rgba(17, 31, 24, 0) 44%, rgba(17, 31, 24, 0.28) 100%), linear-gradient(0deg, rgba(17, 31, 24, 0.52), rgba(17, 31, 24, 0.04) 48%), url(${heroImageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-12 px-4 pb-10 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-petal">
            OrchidCare encyclopedia
          </p>
          <h2 className="mt-4 text-5xl font-bold leading-tight sm:text-7xl">Explore Orchids</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">
            Discover exotic orchids, compare care needs, and learn the essentials for helping each
            bloom thrive.
          </p>
          <div className="mt-8">
            <Link
              to="/orchids"
              className="inline-flex h-12 items-center rounded-md bg-white px-5 text-base font-bold text-rosy transition hover:bg-peony-soft"
            >
              Browse orchids
            </Link>
          </div>
        </div>

        <ul className="grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
          {learningHighlights.map((highlight) => (
            <li key={highlight.title} className="rounded-md bg-white/12 p-4 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-petal">
                {highlight.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/82">{highlight.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
