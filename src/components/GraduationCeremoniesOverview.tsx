import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from './PageHeader';
import ceremonies20July2026 from '../data/ceremonies-20-july-2026.json';
import ceremonies21July2026 from '../data/ceremonies-21-july-2026.json';
import ceremonies22July2026 from '../data/ceremonies-22-july-2026.json';
import ceremonies23July2026 from '../data/ceremonies-23-july-2026.json';
import ceremonies24July2026 from '../data/ceremonies-24-july-2026.json';

const CEREMONY_PAGES = [
  { date: ceremonies20July2026.date, path: '/ceremonies/20-july-2026' },
  { date: ceremonies21July2026.date, path: '/ceremonies/21-july-2026' },
  { date: ceremonies22July2026.date, path: '/ceremonies/22-july-2026' },
  { date: ceremonies23July2026.date, path: '/ceremonies/23-july-2026' },
  { date: ceremonies24July2026.date, path: '/ceremonies/24-july-2026' },
];

const GraduationCeremoniesOverview: React.FC = () => {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden text-white"
      style={{ backgroundColor: '#24135F' }}
    >
      <header className="w-full flex-shrink-0 px-14 pt-14">
        <PageHeader backTo="/menu" backLabel="Back to menu" />
        <div className="mb-8 mt-12">
          <h1 className="break-words text-[2.8125rem] font-source-serif-pro font-bold leading-tight">
            Graduation ceremonies
          </h1>
        </div>
      </header>

      <main className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto px-14 py-4">
        <nav aria-label="Graduation ceremony dates">
          <ul className="flex w-full flex-col">
            {CEREMONY_PAGES.map((ceremony, index) => (
              <li
                key={ceremony.path}
                className={index < CEREMONY_PAGES.length - 1 ? 'mb-8 border-b border-white pb-8' : 'pb-2'}
              >
                <Link
                  to={ceremony.path}
                  className="break-words text-[2.34375rem] font-source-serif-pro font-bold text-white underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
                >
                  {ceremony.date}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="w-full flex-shrink-0" style={{ backgroundColor: '#7100FF' }}>
        <Link
          to="/menu"
          className="flex w-full items-center gap-5 px-14 py-8 text-[2.34375rem] font-source-serif-pro font-bold text-white transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-[3.125rem] w-[3.125rem] flex-shrink-0" aria-hidden="true" />
          <span>Back to menu</span>
        </Link>
      </footer>
    </div>
  );
};

export default GraduationCeremoniesOverview;
