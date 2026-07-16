import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../api/client';

const initialForm = {
  studentName: '',
  email: '',
  phone: '',
  collegeName: '',
  department: '',
  semester: '',
  city: '',
  projectTitle: '',
  projectCategory: '',
  projectDescription: '',
  existingProjectTopic: '',
  requiredTechnologies: '',
  numberOfModules: 1,
  expectedFeatures: '',
  projectType: 'Mini Project',
  projectMode: 'Individual',
  deadline: '',
  budgetRange: '',
  needSourceCode: true,
  needDocumentation: true,
  needPPT: false,
  package: 'Basic',
};

export default function PreBookProjectPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/project-requests', {
        ...form,
        requiredTechnologies: form.requiredTechnologies.split(',').map((item) => item.trim()).filter(Boolean),
      });
      toast.success('Project request submitted');
      setForm(initialForm);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to submit project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl rounded-[30px] border border-slate-200/70 bg-white/85 p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.32)] backdrop-blur-sm">
      <div className="mb-6">
        <div className="pill-tag mb-4">Pre-booking</div>
        <h1 className="text-3xl font-black text-slate-900">Pre-Book a Project</h1>
        <p className="mt-2 text-slate-600">Start with your topic, requirements, and delivery expectations to get a structured quotation and delivery workflow.</p>
      </div>
      <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
        <input className="app-input" placeholder="Student name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} />
        <input className="app-input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="app-input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="app-input" placeholder="College name" value={form.collegeName} onChange={(e) => setForm({ ...form, collegeName: e.target.value })} />
        <input className="app-input" placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <input className="app-input" placeholder="Semester" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} />
        <input className="app-input" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <input className="app-input" placeholder="Project title" value={form.projectTitle} onChange={(e) => setForm({ ...form, projectTitle: e.target.value })} />
        <input className="app-input" placeholder="Project category" value={form.projectCategory} onChange={(e) => setForm({ ...form, projectCategory: e.target.value })} />
        <textarea required minLength="20" className="app-textarea md:col-span-2" placeholder="Describe requirements, modules, features and special instructions" value={form.projectDescription} onChange={(e) => setForm({ ...form, projectDescription: e.target.value })} />
        <input className="app-input" placeholder="Existing project topic" value={form.existingProjectTopic} onChange={(e) => setForm({ ...form, existingProjectTopic: e.target.value })} />
        <input className="app-input" placeholder="Required technologies (comma separated)" value={form.requiredTechnologies} onChange={(e) => setForm({ ...form, requiredTechnologies: e.target.value })} />
        <input type="number" className="app-input" placeholder="Number of modules" value={form.numberOfModules} onChange={(e) => setForm({ ...form, numberOfModules: Number(e.target.value) })} />
        <input className="app-input" placeholder="Expected features" value={form.expectedFeatures} onChange={(e) => setForm({ ...form, expectedFeatures: e.target.value })} />
        <select className="app-select" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
          <option>Mini Project</option>
          <option>Major Project</option>
        </select>
        <select className="app-select" value={form.projectMode} onChange={(e) => setForm({ ...form, projectMode: e.target.value })}>
          <option>Individual</option>
          <option>Group</option>
        </select>
        <input type="date" className="app-input" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
        <input className="app-input" placeholder="Budget range" value={form.budgetRange} onChange={(e) => setForm({ ...form, budgetRange: e.target.value })} />
        <div className="md:col-span-2 grid gap-3 md:grid-cols-2">
          {[['Basic', '₹10,000 — frontend, backend, database and source code'], ['Premium', '₹12,000 — source code, demo video, documentation and deployment']].map(([name, detail]) => (
            <label key={name} className={`cursor-pointer rounded-2xl border p-4 ${form.package === name ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
              <input type="radio" name="package" className="mr-2" checked={form.package === name} onChange={() => setForm({ ...form, package: name })} />
              <span className="font-bold">{name}</span><div className="mt-1 text-xs text-slate-600">{detail}</div>
            </label>
          ))}
        </div>

        <div className="md:col-span-2 grid gap-2 md:grid-cols-3">
          {[
            ['needSourceCode', 'Need source code'],
            ['needDocumentation', 'Need documentation'],
            ['needPPT', 'Need PPT'],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm">
              <input type="checkbox" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} />
              {label}
            </label>
          ))}
        </div>

        <button type="submit" disabled={loading} className="primary-button md:col-span-2">{loading ? 'Submitting...' : 'Submit project request'}</button>
      </form>
    </div>
  );
}
