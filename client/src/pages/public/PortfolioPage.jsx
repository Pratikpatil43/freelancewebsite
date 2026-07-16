import { BadgeCheck, BrainCircuit, FileText, Mic, Sparkles } from 'lucide-react';

export default function PortfolioPage() {
  return <main className="mx-auto max-w-6xl px-4 py-14">
    <div className="mb-9"><div className="pill-tag mb-4">Completed project</div><h1 className="text-4xl font-black">Portfolio</h1><p className="mt-3 text-slate-600">One completed AI project from our development workflow.</p></div>
    <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft">
      <div className="grid lg:grid-cols-[.85fr,1.15fr]"><div className="flex min-h-72 items-center justify-center bg-gradient-to-br from-violet-700 via-blue-700 to-cyan-500 p-10 text-white"><div className="text-center"><BrainCircuit className="mx-auto" size={76}/><div className="mt-5 text-sm font-bold uppercase tracking-[.25em] text-cyan-100">Artificial Intelligence</div></div></div>
      <div className="p-7 md:p-10"><div className="flex flex-wrap items-center justify-between gap-3"><span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700"><BadgeCheck size={17}/> Completed</span><span className="text-sm text-slate-500">AI & Machine Learning</span></div><h2 className="mt-6 text-3xl font-black">AI Meeting Intelligence</h2><p className="mt-4 leading-7 text-slate-600">An intelligent meeting assistant that captures discussions, creates concise summaries, identifies decisions and organizes actionable follow-ups.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{[[Mic,'Meeting capture'],[FileText,'Smart summaries'],[Sparkles,'Action insights']].map(([Icon,label])=><div key={label} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold"><Icon className="mb-2 text-blue-700" size={20}/>{label}</div>)}</div><div className="mt-6 flex flex-wrap gap-2">{['AI','NLP','Speech Processing','Meeting Analytics'].map(tag=><span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{tag}</span>)}</div></div></div>
    </article>
  </main>;
}
