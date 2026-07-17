import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type PageHeaderProps = {
  backTo: string;
  backLabel: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ backTo, backLabel }) => {
  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-6">
        <img
          src="/uos-logo-white.png"
          alt="University of Sheffield"
          className="h-20 w-auto max-w-[55%] flex-shrink-0"
        />
        <Link
          to={backTo}
          className="flex flex-shrink-0 items-center gap-3 text-[1.625rem] font-source-serif-pro font-bold leading-tight text-white transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-10 w-10 flex-shrink-0" aria-hidden="true" />
          <span className="text-right">{backLabel}</span>
        </Link>
      </div>
      <div className="mb-6">
        <div className="h-[3px] w-full bg-white/80" />
      </div>
    </>
  );
};

export default PageHeader;
