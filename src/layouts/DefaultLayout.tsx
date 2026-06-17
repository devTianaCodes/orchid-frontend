import { NavLink, Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <main className="min-h-screen bg-mist text-ink">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">OrchidCare</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-bark">
              Browse orchid care profiles and start learning what each variety needs to thrive.
            </p>
          </div>

          <nav className="flex gap-3 text-sm font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-md border px-4 py-2 transition ${
                  isActive
                    ? "border-leaf bg-leaf text-white"
                    : "border-moss/35 text-leaf hover:border-leaf"
                }`
              }
            >
              Orchids
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `rounded-md border px-4 py-2 transition ${
                  isActive
                    ? "border-leaf bg-leaf text-white"
                    : "border-moss/35 text-leaf hover:border-leaf"
                }`
              }
            >
              Favorites
            </NavLink>
          </nav>
        </header>

        <Outlet />
      </section>
    </main>
  );
}
