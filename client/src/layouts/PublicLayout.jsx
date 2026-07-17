import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { GraduationCap, LayoutGrid, Menu, Phone, X } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-3 text-lg font-bold text-slate-900">
            <span className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-2 text-white shadow-lg shadow-blue-500/20">
              <GraduationCap size={18} />
            </span>
            <span>ProjectDesk</span>
          </NavLink>

          <nav className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <NavLink to="/auth" className="secondary-button px-3 py-2 sm:px-4">
              Sign In
            </NavLink>
            <NavLink to="/user/pre-book" className="hidden px-4 py-2 sm:inline-flex primary-button">
              Pre-Book
            </NavLink>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-public-navigation"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav
            id="mobile-public-navigation"
            className={`${mobileOpen ? 'grid' : 'hidden'} w-full grid-cols-2 gap-2 border-t border-slate-200 pt-3 md:hidden`}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition ${
                    isActive ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/user/pre-book" onClick={() => setMobileOpen(false)} className="primary-button col-span-2 mt-1 py-2.5">
              Pre-Book a Project
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 text-slate-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-bold">ProjectDesk</h3>
            <p className="text-sm text-slate-300">College-project booking and delivery workflow for students, teams, and admins.</p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Quick links</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div><a href="/services">Services</a></div>
              <div><a href="/portfolio">Portfolio</a></div>
              <div><a href="/pricing">Pricing</a></div>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Contact</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <a href="https://wa.me/918088379279" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><Phone size={14} /> WhatsApp: +91 80883 79279</a>
              <div className="flex items-center gap-2"><LayoutGrid size={14} /> 24/7 project coordination</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
