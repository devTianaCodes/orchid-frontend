import { NavLink, Outlet, useLocation } from "react-router-dom";

export function DefaultLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <main className={`min-h-screen ${isHomePage ? "bg-ink text-white" : "bg-sage text-ink"}`}>
      <section
        className={
          isHomePage
            ? "flex min-h-screen w-full flex-col"
            : "mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8"
        }
      >
        <header
          className={
            isHomePage
              ? "absolute left-0 right-0 top-0 z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8"
              : "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          }
        >
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">OrchidCare</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/82">
              Browse orchid care profiles and start learning what each variety needs to thrive.
            </p>
          </div>

          <nav className="flex gap-3 text-sm font-semibold">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-md border px-4 py-2 transition ${
                  isActive
                    ? "border-rosy bg-rosy text-white"
                    : isHomePage
                      ? "border-white/40 text-white hover:border-white"
                      : "border-white/45 text-white hover:border-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/orchids"
              className={({ isActive }) =>
                `rounded-md border px-4 py-2 transition ${
                  isActive
                    ? "border-rosy bg-rosy text-white"
                    : isHomePage
                      ? "border-white/40 text-white hover:border-white"
                      : "border-white/45 text-white hover:border-white"
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
                    ? "border-rosy bg-rosy text-white"
                    : isHomePage
                      ? "border-white/40 text-white hover:border-white"
                      : "border-white/45 text-white hover:border-white"
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
