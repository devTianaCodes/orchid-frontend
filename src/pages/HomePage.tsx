import { Link } from "react-router-dom";

const heroImageUrl =
  "https://images.unsplash.com/photo-1571677179476-ab32559a6c7c?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=3000";

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
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-petal">
            OrchidCare encyclopedia
          </p>
          <h2 className="mt-4 text-5xl font-bold leading-tight sm:text-7xl">Explore Orchids</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">
            Discover orchid varieties, compare care needs, and learn the essentials for helping each
            bloom thrive.
          </p>
          <div className="mt-8">
            <Link
              to="/orchids"
              className="inline-flex h-12 items-center rounded-md bg-white px-5 text-base font-bold text-rosy transition hover:bg-peony"
            >
              Browse orchids
            </Link>
          </div>
        </div>
      </div>

      <a
        href="https://unsplash.com/s/photos/orchids"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-3 right-4 rounded bg-ink/65 px-2 py-1 text-xs font-medium text-white/80 hover:text-white"
      >
        Ardi Evans, via Unsplash
      </a>
    </section>
  );
}
