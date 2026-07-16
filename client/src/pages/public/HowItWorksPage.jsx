export default function HowItWorksPage() {
  const steps = [
    'Sign in',
    'Submit project topic',
    'Upload requirements',
    'Receive project quotation',
    'Confirm pre-booking',
    'Track project milestones',
    'Review progress',
    'Request changes',
    'Complete payment',
    'Download final project files',
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900">How ProjectDesk works</h1>
      <div className="mt-8 space-y-4">
        {steps.map((step, index) => (
          <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">{index + 1}</div>
            <div className="text-lg font-semibold text-slate-800">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
