import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Clock3, MapPin } from 'lucide-react';
import talks from '../data/universityTalks.json';

type Talk = {
  id: number;
  title: string;
  subtitle: string;
  start_time: string; // e.g. 10:45am
  end_time: string;   // e.g. 11:05am
  location: string;
};

const OPEN_DAY_DATE = '2026-06-20'; // Ensure all times mapped to same date (Europe/London)

// Build a Date for a Europe/London wall-clock time on OPEN_DAY_DATE regardless of device tz
function makeEuropeLondonDateForOpenDay(hour: number, minute: number): Date {
  const [y, m, d] = OPEN_DAY_DATE.split('-').map((s) => parseInt(s, 10));
  // Initial UTC candidate near the desired instant
  const utcCandidate = new Date(Date.UTC(y, m - 1, d, hour, minute, 0, 0));

  // How does that instant present in Europe/London?
  const dtf = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const parts = dtf.formatToParts(utcCandidate).reduce<Record<string, string>>((acc, p) => {
    if (p.type !== 'literal') acc[p.type] = p.value;
    return acc;
  }, {});

  const tzYear = parseInt(parts.year, 10);
  const tzMonth = parseInt(parts.month, 10);
  const tzDay = parseInt(parts.day, 10);
  const tzHour = parseInt(parts.hour, 10);
  const tzMinute = parseInt(parts.minute, 10);

  // Compute correction so that wall time matches requested hour/minute in Europe/London
  const desiredUtcMillis = Date.UTC(y, m - 1, d, hour, minute, 0, 0);
  const apparentUtcMillis = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, 0, 0);
  const offsetMillis = desiredUtcMillis - apparentUtcMillis;

  return new Date(utcCandidate.getTime() + offsetMillis);
}

function toDate(time12h: string): Date {
  // Convert like "1:15pm" into a Date on OPEN_DAY_DATE in Europe/London tz
  const match = time12h.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!match) return new Date(NaN);
  let hour = parseInt(match[1], 10);
  const min = parseInt(match[2] || '0', 10);
  const ampm = match[3].toLowerCase();
  // Normalize malformed inputs like "13:05pm" to 12-hour clock before am/pm conversion
  if (hour > 12) hour -= 12;
  if (ampm === 'pm' && hour !== 12) hour += 12;
  if (ampm === 'am' && hour === 12) hour = 0;
  return makeEuropeLondonDateForOpenDay(hour, min);
}

function getStatus(now: Date, start: Date, end: Date): { label: string; bg: string; text: string; accent?: string } | null {
  if (now > end) return null; // event passed -> hidden
  if (now >= start && now <= end) {
    return { label: 'In progress', bg: 'bg-emerald-100', text: 'text-emerald-800', accent: 'emerald' }; // light bg, deep text
  }
  const msUntil = start.getTime() - now.getTime();
  // Floor minutes, but if there are leftover seconds and mins is 0, show 1
  let mins = Math.floor(msUntil / 60000);
  if (mins === 0 && msUntil > 0) mins = 1;
  mins = Math.max(0, mins);
  // Dynamic due label based on start time only
  if (mins > 0) {
    // Only count down within an hour; 60+ mins away -> Upcoming, but exactly 60 -> 1hr
    if (mins > 60) return { label: 'Upcoming', bg: 'bg-gray-200', text: 'text-[#7000FF]' };
    if (mins === 60) return { label: 'Starting in 1hr', bg: 'bg-amber-100', text: 'text-amber-800' };
    const minuteLabel = `Starting in ${mins} min${mins === 1 ? '' : 's'}`;
    if (mins > 30) return { label: minuteLabel, bg: 'bg-amber-100', text: 'text-amber-800' };
    if (mins > 15) return { label: minuteLabel, bg: 'bg-orange-100', text: 'text-orange-800' };
    return { label: minuteLabel, bg: 'bg-red-100', text: 'text-red-800' };
  }
  return { label: 'Upcoming', bg: 'bg-gray-200', text: 'text-[#7000FF]' }; // grey bg + purple text
}

const UniversityTalks: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const i = setInterval(update, 5_000);
    const onVisibility = () => { if (!document.hidden) update(); };
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearInterval(i);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const processed = useMemo(() => {
    const withTimes = (talks as Talk[]).map((t) => ({
      ...t,
      start: toDate(t.start_time),
      end: toDate(t.end_time)
    }));
    // Hide past, sort by start
    return withTimes
      .filter((t) => now <= t.end)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [now]);

  // Single-source fade based on scroll/resize to avoid conflicting observers
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const getCards = () => Array.from(root.querySelectorAll<HTMLElement>('[data-card-id]'));

    let raf = 0;
    // Track last fade amount for smoothing
    let currentFade = 0;

    const recompute = () => {
      if (processed.length <= 3) {
        root.classList.remove('scroll-fade-active');
        root.style.removeProperty('--fade');
        currentFade = 0;
        return;
      }

      const container = root.getBoundingClientRect();
      const cards = getCards();
      
      // Determine last visible card by actual geometry
      let last: HTMLElement | null = null;
      let lastBottom = -Infinity;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        const visibleTop = Math.max(r.top, container.top);
        const visibleBottom = Math.min(r.bottom, container.bottom);
        const visibleH = Math.max(0, visibleBottom - visibleTop);
        if (visibleH > 0 && r.bottom > lastBottom) {
          last = card;
          lastBottom = r.bottom;
        }
      }
      if (!last) return;

      // If the globally last card is visible and the user has reached the end
      // of the scroll (no more space), clear fades so it looks complete
      const isGlobalLast = last === cards[cards.length - 1];
      const atScrollBottom = Math.abs(root.scrollHeight - root.scrollTop - root.clientHeight) < 2;
      if (isGlobalLast && atScrollBottom) {
        root.classList.remove('scroll-fade-active');
        root.style.removeProperty('--fade');
        currentFade = 0;
        return;
      }

      const r = last.getBoundingClientRect();
      const clipped = Math.max(0, r.bottom - container.bottom);
      const distanceToBottom = Math.max(0, container.bottom - r.bottom);

      const START_DISTANCE = 240; // start fading earlier for stronger effect
      const MIN_FADE = 140;       // stronger minimum fade
      const MAX_FADE = 240;       // allow longer fade tail

      const proximity = Math.min(1, Math.max(0, (START_DISTANCE - distanceToBottom) / START_DISTANCE));
      const baseFade = MIN_FADE + proximity * (MAX_FADE - MIN_FADE);
      let fade = Math.min(MAX_FADE, baseFade + clipped * 0.8); // boost when clipped

      // Low-pass filter to avoid sudden jumps of the fade length
      fade = currentFade ? (currentFade * 0.7 + fade * 0.3) : fade;

      // Apply fade to the container instead of individual cards
      if (proximity > 0 || clipped > 0) {
        root.style.setProperty('--fade', `${fade}px`);
        root.classList.add('scroll-fade-active');
      } else {
        root.classList.remove('scroll-fade-active');
        root.style.removeProperty('--fade');
      }

      currentFade = fade;
    };

    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(recompute); };
    const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(recompute); };

    root.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    recompute();

    return () => {
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [processed.length]);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden" style={{ aspectRatio: '1080/1920' }}>
      <div className="absolute inset-0 z-0">
        <video autoPlay={true} muted loop playsInline className="w-full h-full object-cover" style={{ width: '100%', height: '100%' }}>
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col px-12 py-24">
        <div className={`w-full max-w-4xl mx-auto flex flex-col h-full ${processed.length <= 3 ? 'no-fade' : ''}`}>
          {/* Header - aligned with cards container */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex-shrink-0 mt-[72px] mb-8">
              <img src="/uos-logo-white.png" alt="University of Sheffield" className="h-20 w-auto" />
            </div>
            <div className="flex-shrink-0 mt-0 mb-8">
              <div className="w-full h-[3px] bg-white/80"></div>
            </div>
            <div className="flex-shrink-0 my-10">
              <h1 className="text-white text-5xl font-source-serif-pro font-bold">University talks</h1>
              <p className="text-gray-200 text-4xl my-4">Saturday 20 June 2026</p>
              <p className="text-gray-200 text-2xl my-4">Scroll down for more</p>
            </div>
          </div>

          {/* Cards (limit to 5, larger density) */}
          <div className="w-full max-w-6xl mx-auto flex-1 min-h-0">
            <div ref={scrollerRef} className="w-full h-full grid grid-cols-2 gap-6 overflow-y-auto pr-2 pb-44 scroll-fade-container">
            {processed.map((t) => {
              const status = getStatus(now, t.start, t.end);
              if (!status) return null; // already filtered but keep guard
              return (
                <div data-card-id={t.id} key={t.id} className="bg-black/40 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl"> 
                  <div className="flex flex-col gap-4">
                    {/* Row 1: Badge */}
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[14px] font-semibold ${status.bg} ${status.text} shadow-lg border-2 border-white/40 w-fit`}
                      aria-live="polite"
                      role="status"
                    >
                      {status.label === 'In progress' && (
                        <span className="relative flex h-3 w-3">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${status.accent === 'emerald' ? 'bg-emerald-400' : 'bg-emerald-400'}`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${status.accent === 'emerald' ? 'bg-emerald-600' : 'bg-emerald-600'}`}></span>
                        </span>
                      )}
                      {status.label}
                    </div>
                    
                    {/* Row 2: Title */}
                    <h3 className="text-white text-[20px] font-source-serif-pro font-bold drop-shadow-2xl leading-tight">{t.title}</h3>
                    
                    {/* Row 3: Time + Location */}
                    <div className="flex flex-col gap-2 text-white text-[16px] drop-shadow-lg">
                      <div className="flex items-center gap-2.5">
                        <Clock3 className="w-5 h-5 flex-shrink-0" />
                        <span className="leading-tight">
                          {t.start_time} - {t.end_time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-5 h-5 flex-shrink-0" />
                        <span className="leading-tight">{t.location}</span>
                      </div>
                    </div>
                    
                    {/* Row 4: Description */}
                    <p className="text-white text-[18px] drop-shadow-xl">{t.subtitle}</p>
                  </div>
                </div>
              );
            })}

            {processed.length === 0 && (
              <div className="text-center text-white/80 text-2xl py-20">No more talks today.</div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityTalks;


