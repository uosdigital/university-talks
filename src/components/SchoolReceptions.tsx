import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock3, MapPin } from 'lucide-react';

export type ReceptionSession = {
  time: string;
  location: string;
  detail?: string;
};

export type ReceptionEntry = {
  school: string;
  detail?: string;
  sessions: ReceptionSession[];
};

export type ReceptionDay = {
  date: string;
  receptions: ReceptionEntry[];
};

type SchoolReceptionsProps = {
  day: ReceptionDay;
};

const SchoolReceptions: React.FC<SchoolReceptionsProps> = ({ day }) => {
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
            {day.date}
          </h1>
        </div>
      </header>

      <main className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto px-14 py-4">
        <div className="flex w-full flex-col">
          {day.receptions.map((reception, receptionIndex) => (
            <div
              key={`${reception.school}-${reception.detail ?? ''}-${receptionIndex}`}
              className={
                receptionIndex < day.receptions.length - 1
                  ? 'mb-10 border-b border-white pb-10'
                  : 'pb-2'
              }
            >
              <h2 className="mb-4 break-words text-[1.875rem] font-source-serif-pro font-bold">
                {reception.school}
              </h2>
              {reception.detail && (
                <p className="mb-4 break-words text-[1.5625rem] font-source-sans-pro font-normal italic">
                  {reception.detail}
                </p>
              )}

              <div className="flex w-full flex-col gap-6">
                {reception.sessions.map((session, sessionIndex) => (
                  <div
                    key={`${session.time}-${session.location}-${sessionIndex}`}
                    className="flex min-w-0 w-full flex-col gap-2"
                  >
                    <div className="flex flex-col gap-2 text-[1.5625rem] font-source-sans-pro font-normal">
                      <div className="flex items-center gap-2.5">
                        <Clock3 className="h-5 w-5 flex-shrink-0" />
                        <span className="break-words leading-tight">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-5 w-5 flex-shrink-0" />
                        <span className="break-words leading-tight">{session.location}</span>
                      </div>
                    </div>
                    {session.detail && (
                      <p className="break-words pl-8 text-[1.5625rem] font-source-sans-pro font-normal italic">
                        {session.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full flex-shrink-0" style={{ backgroundColor: '#7100FF' }}>
        <Link
          to="/receptions"
          className="flex w-full items-center gap-5 px-14 py-8 text-[2.34375rem] font-source-serif-pro font-bold text-white transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-[3.125rem] w-[3.125rem] flex-shrink-0" aria-hidden="true" />
          <span>Back to schedule</span>
        </Link>
      </footer>
    </div>
  );
};

export default SchoolReceptions;
