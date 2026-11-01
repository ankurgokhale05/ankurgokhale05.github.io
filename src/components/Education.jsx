import { education } from '../data';
import { Logo } from './Experience';
import { ArrowUpRight } from './Icons';
import TechList from './TechList';

export default function Education() {
  return (
    <ol className="group/list">
      {education.map((e) => (
        <li data-reveal key={e.school} className="mb-12">
          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
            <header className="z-10 mb-3 flex items-center gap-3 sm:col-span-2 sm:mb-0 sm:flex-col sm:items-start">
              <Logo src={e.logo} name={e.school} />
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{e.date}</span>
            </header>
            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-slate-200">
                <a
                  className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                  href={e.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${e.degree} · ${e.school} (opens in a new tab)`}
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                  <span>
                    {e.degree} · <span className="inline-block">
                      {e.school}
                      <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </span>
                </a>
              </h3>
              <div className="text-sm text-slate-400">{e.location}</div>
              {e.details.length > 0 && <p className="mt-2 text-sm leading-normal">{e.details.join(' · ')}</p>}
              {e.coursework.length > 0 && <TechList items={e.coursework} label="Relevant coursework" />}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
