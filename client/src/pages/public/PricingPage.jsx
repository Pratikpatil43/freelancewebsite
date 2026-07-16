const packages = [
  { title: 'Basic', price: '₹10,000', features: ['Frontend', 'Backend', 'Standard database', 'Complete source code'] },
  { title: 'Premium', price: '₹12,000', featured: true, features: ['Frontend and backend', 'Complete source code', 'Project demo video', 'Project documentation', 'Project deployment'] },
];

export default function PricingPage() {
  return <div className="mx-auto max-w-7xl px-4 py-12">
    <div className="mb-9 text-center"><h1 className="text-4xl font-black text-slate-900">Simple project pricing</h1><p className="mt-3 text-slate-600">Choose the delivery package that fits your project.</p></div>
    <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">{packages.map((pkg) => <div key={pkg.title} className={`rounded-3xl border bg-white p-7 shadow-soft ${pkg.featured ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'}`}>
      <h3 className="text-2xl font-bold">{pkg.title}</h3><div className="mt-2 text-4xl font-black text-blue-700">{pkg.price}</div>
      <div className="mt-5 space-y-3 text-sm text-slate-700">{pkg.features.map((feature) => <div key={feature}>✓ {feature}</div>)}</div>
      <a href="/user/pre-book" className="primary-button mt-7 w-full">Choose {pkg.title}</a>
    </div>)}</div>
  </div>;
}
