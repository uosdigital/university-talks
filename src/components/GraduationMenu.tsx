import React from 'react';
import { Link } from 'react-router-dom';

const MENU_ITEMS = [
  { label: 'Graduation ceremonies', path: '/ceremonies' },
  { label: 'School receptions', path: '/receptions' },
];

const SOCIAL_LINKS = [
  {
    label: 'TikTok',
    username: '@sheffielduni',
    href: 'https://www.tiktok.com/@sheffielduni',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-14 w-14" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    username: 'theuniversityofsheffield',
    href: 'https://www.instagram.com/theuniversityofsheffield/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-14 w-14" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const GraduationMenu: React.FC = () => {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden text-white"
      style={{ backgroundColor: '#24135F' }}
    >
      <div className="flex h-[75%] min-h-0 w-full flex-col px-14 pt-28">
        <div className="flex w-full flex-shrink-0 justify-center">
          <img
            src="/uos-logo-white.png"
            alt="University of Sheffield"
            className="h-44 w-auto max-w-full"
          />
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center text-center">
          <h1 className="mb-6 max-w-full break-words text-[6.25rem] font-source-serif-pro font-bold leading-tight">
            Congratulations to the Class of 2026!
          </h1>
          <p className="max-w-full break-words text-[3rem] font-source-sans-pro font-normal leading-snug">
            You're joining a community of over 300,000 Sheffield alumni across the globe.
          </p>
        </div>

        <div className="w-full max-w-full flex-shrink-0">
          <p className="mb-8 text-center text-[2.125rem] font-source-sans-pro font-normal leading-snug text-balance">
            Use the buttons below to check our timetables for ceremonies and school receptions:
          </p>

          <nav aria-label="Graduation schedules" className="flex w-full flex-col gap-6">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex w-full items-center justify-center px-8 py-8 text-center text-[2.34375rem] font-source-serif-pro font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#7100FF' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex h-[25%] flex-shrink-0 flex-col items-center justify-center gap-8 px-14">
        <div className="flex w-full items-start justify-center gap-16">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 text-white transition-opacity hover:opacity-80"
              aria-label={`${social.label}: ${social.username}`}
            >
              {social.icon}
              <span className="text-center text-[1.875rem] font-source-sans-pro font-normal leading-tight">
                {social.username}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraduationMenu;
