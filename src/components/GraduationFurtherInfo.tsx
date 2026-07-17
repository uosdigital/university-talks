import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from './PageHeader';

const GraduationFurtherInfo: React.FC = () => {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden text-white"
      style={{ backgroundColor: '#24135F' }}
    >
      <header className="w-full flex-shrink-0 px-14 pt-14">
        <PageHeader backTo="/menu" backLabel="Back to menu" />
        <div className="mb-4 mt-12 text-center">
          <h1 className="break-words text-[2.8125rem] font-source-serif-pro font-bold leading-tight">
            Further information
          </h1>
        </div>
      </header>

      <main className="flex min-h-0 w-full flex-1 flex-col items-center justify-start px-14 pt-6 pb-8 text-center">
        <p className="mb-10 max-w-[58rem] text-[2.125rem] font-source-sans-pro font-normal leading-snug text-balance">
          Scan the QR code below for further information about food and drink, robing and
          photography, graduation merchandise and more.
        </p>
        <img
          src="/graduation-qr-code.png"
          alt="QR code linking to sheffield.ac.uk/graduation"
          className="h-72 w-72"
        />
        <p className="mt-8 text-center text-[2.0rem] font-source-sans-pro font-normal leading-snug">
          sheffield.ac.uk/graduation
        </p>
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

export default GraduationFurtherInfo;
