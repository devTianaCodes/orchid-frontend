import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import orchidCareLogo from "../assets/orchidcare-logo.png";

export function DefaultLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex h-12 w-32 items-center justify-center rounded-md px-5 text-base font-bold text-rosy transition ${
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
              ? "absolute left-0 right-0 top-0 z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8"
              : "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          }
        >
          <div className="flex items-center justify-between gap-4">
            <img src={orchidCareLogo} alt="OrchidCare" className="h-auto w-44 max-w-full sm:w-56" />

            <button
              type="button"
              className="inline-flex h-12 w-12 shrink-0 translate-y-1 items-center justify-center rounded-md bg-white text-2xl font-bold leading-none text-rosy transition hover:bg-peony lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className="-translate-y-[3px]">{isMenuOpen ? "×" : "☰"}</span>
            </button>
          </div>

          <nav className="hidden translate-y-1 flex-wrap gap-3 lg:flex">
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

          {isMenuOpen ? (
            <nav id="mobile-navigation" className="flex flex-col gap-3 lg:hidden">
              <NavLink to="/" end className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/orchids" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                Orchids
              </NavLink>
              <NavLink
                to="/favorites"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </NavLink>
            </nav>
          ) : null}
        </header>

        <Outlet />
      </section>
    </main>
  );
}
