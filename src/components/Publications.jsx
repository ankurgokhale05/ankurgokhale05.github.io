import { publications } from '../data';
import { ArrowRight, ArrowUpRight } from './Icons';
import TechList from './TechList';

const ME = 'A. Gokhale';

export default function Publications({ onOpenSlides }) {
  return (
    <ol className="group/list">
      {publications.map((p) => (
        <li key={p.title} data-reveal className="mb-12">
          <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
            <header className="z-10 mb-2 mt-1 flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2 sm:flex-col sm:items-start">
              <span>{p.date}</span>
              <span className="normal-case tracking-normal text-slate-400">{p.type}</span>
            </header>
            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-slate-200">
                {p.url ? (
                  <a
                    className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${p.title} (opens in a new tab)`}
                  >
                    <span>
                      {p.title}
                      <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </a>
                ) : (
                  <span className="text-base leading-tight">{p.title}</span>
                )}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{p.venue}</p>
              {p.authors && (
                <p className="mt-1 text-sm">
                  {p.authors.map((a, i) => (
                    <span key={a}>
                      {i > 0 && ', '}
                      {a === ME ? <b className="font-medium text-slate-200">{a}</b> : a}
                    </span>
                  ))}
                </p>
              )}
              {p.award && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
                  <span aria-hidden="true">🏆</span>
                  {p.award}
                </p>
              )}
              {p.description && <p className="mt-2 text-sm leading-normal">{p.description}</p>}
              {p.tech.length > 0 && <TechList items={p.tech} label="Topics" />}
              {p.slides && onOpenSlides && (
                <button
                  type="button"
                  onClick={() => onOpenSlides(p)}
                  className="group/btn relative mt-3 inline-flex items-baseline text-sm font-semibold text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                >
                  View slides
                  <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover/btn:translate-x-1 motion-reduce:transition-none" />
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
