import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from './PageHeader';

export type SchoolItem =
  | string
  | {
      name: string;
      programmes?: string[];
    };

export type ScheduleEntry = {
  faculty?: string;
  schools?: SchoolItem[];
  honorary?: string;
};

export type ScheduleSlot = {
  time: string;
  entries: ScheduleEntry[];
};

export type ScheduleDay = {
  date: string;
  slots: ScheduleSlot[];
};

function SchoolList({ schools }: { schools: SchoolItem[] }) {
  return (
    <ul className="list-disc pl-6 text-[1.5625rem] font-source-sans-pro font-normal [overflow-wrap:anywhere]">
      {schools.map((school, index) => {
        if (typeof school === 'string') {
          return (
            <li key={`${school}-${index}`} className="break-words">
              {school}
            </li>
          );
        }

        return (
          <li key={`${school.name}-${index}`} className="break-words">
            {school.name}
            {school.programmes && school.programmes.length > 0 && (
              <ul className="mt-1 list-disc pl-6 [overflow-wrap:anywhere]">
                {school.programmes.map((programme) => (
                  <li key={programme} className="break-words">
                    {programme}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

type GraduationScheduleProps = {
  day: ScheduleDay;
};

const GraduationSchedule: React.FC<GraduationScheduleProps> = ({ day }) => {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden text-white"
      style={{ backgroundColor: '#24135F' }}
    >
      <header className="w-full flex-shrink-0 px-14 pt-14">
        <PageHeader backTo="/ceremonies" backLabel="Back to schedule" />
        <div className="mb-8 mt-12">
          <h1 className="break-words text-[2.8125rem] font-source-serif-pro font-bold leading-tight">
            {day.date}
          </h1>
        </div>
      </header>

      <main className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto px-14 py-4">
        <section className="w-full">
          <div className="flex w-full flex-col">
            {day.slots.map((slot, slotIndex) => (
              <div
                key={`${day.date}-${slot.time}`}
                className={slotIndex < day.slots.length - 1 ? 'mb-10 border-b border-white pb-10' : 'pb-2'}
              >
                <p className="mb-4 break-words text-[2.34375rem] font-source-serif-pro font-bold">
                  {slot.time}
                </p>

                <div className="flex w-full flex-col gap-6">
                  {slot.entries.map((entry, index) => (
                    <div key={`${slot.time}-${index}`} className="flex min-w-0 w-full flex-col gap-2">
                      {entry.honorary && (
                        <p className="break-words text-[1.5625rem] font-source-sans-pro font-normal italic">
                          {entry.honorary}
                        </p>
                      )}
                      {entry.faculty && (
                        <h2 className="break-words text-[1.875rem] font-source-serif-pro font-bold">
                          {entry.faculty}
                        </h2>
                      )}
                      {entry.schools && entry.schools.length > 0 && (
                        <SchoolList schools={entry.schools} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full flex-shrink-0" style={{ backgroundColor: '#7100FF' }}>
        <Link
          to="/ceremonies"
          className="flex w-full items-center gap-5 px-14 py-8 text-[2.34375rem] font-source-serif-pro font-bold text-white transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-[3.125rem] w-[3.125rem] flex-shrink-0" aria-hidden="true" />
          <span>Back to schedule</span>
        </Link>
      </footer>
    </div>
  );
};

export default GraduationSchedule;
