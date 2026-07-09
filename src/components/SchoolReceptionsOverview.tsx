import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import receptions20July2026 from '../data/receptions-20-july-2026.json';
import receptions21July2026 from '../data/receptions-21-july-2026.json';
import receptions22July2026 from '../data/receptions-22-july-2026.json';
import receptions23July2026 from '../data/receptions-23-july-2026.json';
import receptions24July2026 from '../data/receptions-24-july-2026.json';

const RECEPTION_PAGES = [
  { date: receptions20July2026.date, path: '/receptions/20-july-2026' },
  { date: receptions21July2026.date, path: '/receptions/21-july-2026' },
  { date: receptions22July2026.date, path: '/receptions/22-july-2026' },
  { date: receptions23July2026.date, path: '/receptions/23-july-2026' },
  { date: receptions24July2026.date, path: '/receptions/24-july-2026' },
];

const SchoolReceptionsOverview: React.FC = () => {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden text-white"
      style={{ backgroundColor: '#24135F' }}
    >
      <header className="w-full flex-shrink-0 px-14 pt-14">
        <div className="mb-6">
          <img src="/uos-logo-white.png" alt="University of Sheffield" className="h-20 w-auto max-w-full" />
        </div>
        <div className="mb-6">
          <div className="h-[3px] w-full bg-white/80" />
        </div>
        <div className="mb-8 mt-12">
          <h1 className="break-words text-[2.8125rem] font-source-serif-pro font-bold leading-tight">
            School receptions
          </h1>
        </div>
      </header>

      <main className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto px-14 py-4">
        <nav aria-label="School reception dates">
          <ul className="flex w-full flex-col">
            {RECEPTION_PAGES.map((reception, index) => (
              <li
                key={reception.path}
                className={index < RECEPTION_PAGES.length - 1 ? 'mb-8 border-b border-white pb-8' : 'pb-2'}
              >
                <Link
                  to={reception.path}
                  className="break-words text-[2.34375rem] font-source-serif-pro font-bold text-white underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
                >
                  {reception.date}
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

export default SchoolReceptionsOverview;
