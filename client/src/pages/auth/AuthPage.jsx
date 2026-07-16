import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, googleAuth } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleCredentialResponse = async (response) => {
    if (!response?.credential) {
      toast.error('Google sign-in was cancelled');
      return;
    }

    setLoading(true);
    try {
      const data = await googleAuth(response.credential);
      toast.success('Google sign-in successful');
      navigate(data.data.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Google auth failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!googleClientId) {
      return;
    }

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredentialResponse,
      });

      const container = document.getElementById('google-signin-button');
      if (container) {
        window.google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          shape: 'pill',
        });
      }
    };

    if (window.google?.accounts?.id) {
      initializeGoogle();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [navigate, googleAuth]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        const data = await register(form);
        toast.success('Account created successfully');
        navigate(data.data.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      } else {
        const data = await login({ email: form.email, password: form.password });
        toast.success('Logged in successfully');
        navigate(data.data.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-6 rounded-[30px] border border-slate-200/70 bg-white/85 p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.32)] backdrop-blur-sm md:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-[28px] bg-gradient-to-br from-slate-900 to-blue-900 p-8 text-white">
          <h1 className="text-3xl font-black">Join ProjectDesk</h1>
          <p className="mt-3 text-slate-200">Manage your college project booking, milestones, files, and payments from one secure dashboard.</p>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-[24px] bg-slate-50/70 p-4">
          <div className="flex rounded-full bg-slate-100 p-1">
            <button type="button" onClick={() => setMode('login')} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>Login</button>
            <button type="button" onClick={() => setMode('register')} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${mode === 'register' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>Register</button>
          </div>
          {mode === 'register' && (
            <>
              <input className="app-input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="app-input" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </>
          )}
          <input className="app-input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="app-input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit" className="primary-button w-full" disabled={loading}>{loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}</button>
          <div className="py-1 text-center text-xs font-semibold text-slate-400">OR CONTINUE WITH GOOGLE</div>
          {googleClientId ? <div id="google-signin-button" className="flex min-h-11 w-full justify-center" /> : <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-center text-xs text-amber-800">Google sign-in requires <b>VITE_GOOGLE_CLIENT_ID</b> in client/.env. Email login is available.</div>}
        </form>
      </div>
    </div>
  );
}
