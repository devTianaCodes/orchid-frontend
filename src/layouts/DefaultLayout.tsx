import { NavLink, Outlet, useLocation } from "react-router-dom";

import orchidCareLogo from "../assets/orchidcare-logo.png";

export function DefaultLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex h-12 items-center rounded-md px-5 text-base font-bold text-rosy transition ${
      isActive ? "bg-peony" : "bg-white hover:bg-peony"
    }`;

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
              ? "relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:absolute sm:left-0 sm:right-0 sm:top-0 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8"
              : "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          }
        >
          <div>
            <img src={orchidCareLogo} alt="OrchidCare" className="h-auto w-72 max-w-full sm:w-96" />
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/82">
              Browse orchid care profiles and start learning what each variety needs to thrive.
            </p>
          </div>

          <nav className="flex flex-wrap gap-3">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/orchids" className={navLinkClass}>
              Orchids
            </NavLink>
            <NavLink to="/favorites" className={navLinkClass}>
              Favorites
            </NavLink>
          </nav>
        </header>

        <Outlet />
      </section>
    </main>
  );
}
