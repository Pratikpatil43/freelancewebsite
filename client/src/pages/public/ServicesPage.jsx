import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SquareCode, BrainCircuit, Smartphone, Database, Blocks, Cpu } from 'lucide-react';
import api from '../../api/client';

const fallbackServices = [
  { title: 'Web Application Development', description: 'Responsive web apps with modern UI and secure architecture.', icon: SquareCode, technologies: ['React', 'Node.js', 'MongoDB'] },
  { title: 'MERN Stack Projects', description: 'Full-stack development for dynamic college projects and modules.', icon: Database, technologies: ['MongoDB', 'Express', 'React', 'Node.js'] },
  { title: 'AI and Machine Learning Projects', description: 'Build intelligent dashboards, models, and research-driven systems.', icon: BrainCircuit, technologies: ['Python', 'TensorFlow', 'Scikit-learn'] },
  { title: 'Mobile Application Development', description: 'Feature-rich mobile experiences for student apps and prototypes.', icon: Smartphone, technologies: ['React Native', 'Firebase', 'API'] },
  { title: 'Data Science Projects', description: 'Visualization, analytics, and prediction pipelines with clean reporting.', icon: Cpu, technologies: ['Python', 'Pandas', 'Power BI'] },
  { title: 'Blockchain Projects', description: 'Smart contract and distributed ledger project support.', icon: Blocks, technologies: ['Solidity', 'Blockchain', 'Web3'] },
];

export default function ServicesPage() {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/public/services');
        if (data?.data?.services?.length) {
          setServices(data.data.services.filter((service) => fallbackServices.some((item) => item.title === service.title)));
        }
      } catch (error) {
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900">Services</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Choose the right development and support package for your college project need.</p>
      </div>

      {loading ? (
        <div className="text-slate-500">Loading services...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon || SquareCode;
            return (
              <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
                <div className="mb-3 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700"><Icon size={22} /></div>
                <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.description || service.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(service.technologies || service.tech || []).map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{tech}</span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <Link to="/contact" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold">View details</Link>
                  <Link to="/user/pre-book" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Pre-book</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
