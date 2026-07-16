import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, MessagesSquare, CreditCard, FolderOpen, Bell, UserCircle, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const studentLinks = [
  { label: 'Dashboard', to: '/user/dashboard', icon: LayoutDashboard },
  { label: 'My Projects', to: '/user/projects', icon: FolderOpen },
  { label: 'Pre-Book New Project', to: '/user/pre-book', icon: FileText },
  { label: 'Messages', to: '/user/messages', icon: MessagesSquare },
  { label: 'Payments', to: '/user/payments', icon: CreditCard },
  { label: 'Notifications', to: '/user/notifications', icon: Bell },
  { label: 'Profile', to: '/user/profile', icon: UserCircle },
];

const adminLinks = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Project Requests', to: '/admin/requests', icon: FileText },
  { label: 'All Projects', to: '/admin/projects', icon: FolderOpen },
  { label: 'Payments', to: '/admin/payments', icon: CreditCard },
  { label: 'Notifications', to: '/admin/notifications', icon: Bell },
  { label: 'Clients', to: '/admin/clients', icon: UserCircle },
];

export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <button
        className="fixed left-4 top-4 z-50 rounded-full bg-slate-900 p-3 text-white shadow-lg md:hidden"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside className={`fixed left-0 top-0 z-40 h-screen w-72 border-r border-slate-800 bg-slate-950 p-4 text-slate-100 transition-transform duration-300 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 p-2 text-white">PD</div>
          <div>
            <div className="font-bold">ProjectDesk</div>
            <div className="text-xs text-slate-300">{role === 'admin' ? 'Admin Workspace' : 'Student Workspace'}</div>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={16} /> {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button
          className="mt-8 flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-3 text-sm text-slate-300"
          onClick={async () => {
            await logout();
            window.location.href = '/';
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      <div className="md:ml-72">
        <header className="border-b border-slate-200 bg-white/85 px-4 py-4 pl-16 backdrop-blur-sm md:pl-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Welcome back, {user?.name || 'Student'}</h1>
              <p className="text-sm text-slate-500">Your project workspace and delivery dashboard</p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {role === 'admin' ? 'Admin Access' : 'Student Access'}
            </div>
          </div>
        </header>

        <main className="min-w-0 overflow-x-hidden p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
