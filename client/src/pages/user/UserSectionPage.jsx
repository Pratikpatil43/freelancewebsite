import { Bell, UserCircle } from 'lucide-react';
import UserDashboardPage from './UserDashboardPage.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function UserSectionPage({ section }) {
  const { user } = useAuth();
  if (['projects', 'messages', 'payments'].includes(section)) return <UserDashboardPage view={section} />;
  const notifications = section === 'notifications';
  const Icon = notifications ? Bell : UserCircle;
  return <div className="soft-card max-w-3xl p-7"><Icon className="text-blue-700" size={30} /><h1 className="mt-4 text-3xl font-black">{notifications ? 'Notifications' : 'My profile'}</h1><p className="mt-2 text-slate-600">{notifications ? 'Project confirmations, progress, payment and delivery updates appear here and alongside your projects.' : 'Your secure customer account information.'}</p>{!notifications && <div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><b>Name</b><div className="mt-1 text-slate-600">{user?.name}</div></div><div className="rounded-2xl bg-slate-50 p-4"><b>Email</b><div className="mt-1 break-all text-slate-600">{user?.email}</div></div></div>}</div>;
}
