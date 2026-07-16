import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLoginPage() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault(); setLoading(true);
    try {
      const data = await login(form);
      if (data.data.user.role !== 'admin') {
        await logout();
        toast.error('This account does not have administrator access.');
        return;
      }
      toast.success('Administrator login successful');
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Invalid administrator credentials');
    } finally { setLoading(false); }
  };

  return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-12">
    <div className="w-full max-w-md rounded-[30px] border border-white/10 bg-white p-7 shadow-2xl md:p-9"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white"><ShieldCheck size={28}/></div><h1 className="mt-5 text-center text-3xl font-black">Admin access</h1><p className="mt-2 text-center text-sm text-slate-500">Restricted to authorized ProjectDesk administrators.</p>
      {user && <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">You are currently signed in as a student. Enter your separate administrator credentials below.</div>}
      <form onSubmit={submit} className="mt-6 space-y-4"><input required type="email" autoComplete="username" className="app-input" placeholder="Administrator email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input required type="password" autoComplete="current-password" className="app-input" placeholder="Administrator password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button disabled={loading} className="primary-button w-full"><LockKeyhole size={17}/>{loading?'Verifying...':'Secure admin login'}</button></form><a href="/" className="mt-5 block text-center text-sm font-semibold text-slate-500 hover:text-slate-900">Return to website</a></div>
  </main>;
}
