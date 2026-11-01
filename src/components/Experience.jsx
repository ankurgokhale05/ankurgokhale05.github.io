import { experience } from '../data';
import { ArrowUpRight, ArrowRight } from './Icons';
import TechList from './TechList';

export function Logo({ src, name }) {
  if (src) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-2">
        <img src={`${import.meta.env.BASE_URL}${src}`} alt={`${name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" />
      </div>
    );
  }
  const initials = name.replace(/\b(Inc|LLC|Ltd)\.?/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
  return (
    <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm font-semibold text-teal-300 ring-1 ring-slate-700">
      {initials}
    </div>
  );
}

function Title({ job }) {
  const text = (arrow) => (
    <>
      {job.title} · <span className="inline-block">{job.company}{arrow}</span>
    </>
  );
  const cls = 'font-medium leading-snug text-slate-200';
  return (
    <h3 className={cls}>
      {job.url ? (
        <a
          className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
          href={job.url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${job.title} at ${job.company} (opens in a new tab)`}
        >
          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
          <span>
            {text(<ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />)}
          </span>
        </a>
      ) : (
        <span className="text-base leading-tight group-hover:text-teal-300">{text(null)}</span>
      )}
    </h3>
  );
}

export default function Experience({ onOpenResume }) {
  return (
    <div>
      <ol className="group/list">
        {experience.map((job) => (
          <li data-reveal key={job.company} className="mb-12">
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
              <header className="z-10 mb-3 flex items-center gap-3 sm:col-span-2 sm:mb-0 sm:flex-col sm:items-start sm:gap-3">
                <Logo src={job.logo} name={job.company} />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{job.date || job.location}</span>
              </header>
              <div className="z-10 sm:col-span-6">
                <Title job={job} />
                {job.date && job.location && <div className="text-sm text-slate-500">{job.location}</div>}
                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-normal marker:text-slate-600">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <TechList items={job.tech} label="Technologies used" />
              </div>
            </div>
          </li>
        ))}
      </ol>
      {onOpenResume && (
        <div className="mt-12">
          <button
            type="button"
            onClick={onOpenResume}
            className="group inline-flex items-baseline font-semibold leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
          >
            View Full Résumé
            <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
          </button>
        </div>
      )}
    </div>
  );
}
