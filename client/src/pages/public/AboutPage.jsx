export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900">About ProjectDesk</h1>
      <p className="mt-3 text-slate-600">ProjectDesk is a professional college-project development platform created to help students pre-book development support, track progress, and receive full project deliverables from a secure workspace.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Mission</h2>
          <p className="mt-2 text-sm text-slate-600">To make college project delivery structured, transparent, and student-friendly.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Quality assurance</h2>
          <p className="mt-2 text-sm text-slate-600">Every project moves through milestones, status review, file check, and final delivery support.</p>
        </div>
      </div>
    </div>
  );
}
