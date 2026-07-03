import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import orchidCareLogo from "../assets/orchidcare-logo.png";

const homeHeroImageUrl =
  "https://images.unsplash.com/photo-1571677179476-ab32559a6c7c?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=3000";

export function DefaultLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isOrchidsPage = location.pathname === "/orchids";
  const isCareGuidePage = location.pathname === "/care-guide";
  const isFavoritesPage = location.pathname === "/favorites";
  const isRareOrchidsPage = location.pathname === "/rare-orchids";
  const isOrchidDetailPage = location.pathname.startsWith("/orchids/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-flex items-center whitespace-nowrap text-[1.14rem] font-medium leading-none transition hover:scale-105 hover:text-peony-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:bg-current ${
      isActive
        ? "scale-105 text-peony-soft after:w-full"
        : "text-white after:w-0 after:transition-all hover:after:w-full"
    }`;
  const hasSoftHeroBackground =
    isOrchidsPage || isCareGuidePage || isFavoritesPage || isRareOrchidsPage || isOrchidDetailPage;
  const mainStyle = hasSoftHeroBackground
    ? {
        backgroundAttachment: "fixed",
        backgroundColor: "#e8f4eb",
        backgroundImage: `linear-gradient(rgba(67, 117, 74, 0.6), rgba(67, 117, 74, 0.6)), url(${homeHeroImageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }
    : undefined;
  const mainClassName = isHomePage
    ? "min-h-screen bg-ink text-white"
    : `min-h-screen ${hasSoftHeroBackground ? "text-ink" : "bg-[#e8f4eb] text-ink"}`;

  return (
    <main className={mainClassName} style={mainStyle}>
      <section
        className={
          isHomePage
            ? "flex min-h-screen w-full flex-col"
            : "mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-8 pt-6 sm:px-6 lg:px-8"
        }
      >
        <header
          className={
            isHomePage
              ? "absolute left-0 right-0 top-0 z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8"
              : "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:pb-6"
          }
        >
          <div className="flex items-center justify-between gap-4">
            <NavLink
              to="/"
              end
              aria-label="Go to OrchidCare home"
              className="group inline-flex rounded-md transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy"
              onClick={() => setIsMenuOpen(false)}
            >
              <span
                aria-hidden="true"
                className="aspect-[1562/285] w-44 max-w-full bg-white transition group-hover:bg-peony-soft sm:w-56"
                style={{
                  maskImage: `url(${orchidCareLogo})`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskImage: `url(${orchidCareLogo})`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                }}
              />
            </NavLink>

            <button
              type="button"
              className="inline-flex h-12 w-12 shrink-0 translate-y-1 items-center justify-center rounded-md bg-white text-2xl font-bold leading-none text-rosy transition hover:bg-peony-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className="-translate-y-[3px]">{isMenuOpen ? "×" : "☰"}</span>
            </button>
          </div>

          <nav className="hidden translate-y-1 flex-wrap gap-6 lg:flex">
            <NavLink to="/orchids" className={navLinkClass}>
              Orchids
            </NavLink>
            <NavLink to="/favorites" className={navLinkClass}>
              Favorites
            </NavLink>
            <NavLink to="/rare-orchids" className={navLinkClass}>
              Rare Collection
            </NavLink>
            <NavLink to="/care-guide" className={navLinkClass}>
              Care Guide
            </NavLink>
          </nav>

          {isMenuOpen ? (
            <nav id="mobile-navigation" className="flex flex-col gap-6 lg:hidden">
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
              <NavLink
                to="/rare-orchids"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Rare Collection
              </NavLink>
              <NavLink
                to="/care-guide"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Care Guide
              </NavLink>
            </nav>
          ) : null}
        </header>

        <Outlet />
      </section>
    </main>
  );
}
