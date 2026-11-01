import { experience, profile } from '../data';
import { ArrowUpRight, ArrowRight } from './Icons';
import TechList from './TechList';

function Title({ job }) {
  const text = (
    <>
      {job.title} · <span className="inline-block">{job.company}</span>
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
            {text}
            <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
          </span>
        </a>
      ) : (
        <span className="text-base leading-tight group-hover:text-teal-300">{text}</span>
      )}
    </h3>
  );
}

export default function Experience() {
  return (
    <div>
      <ol className="group/list">
        {experience.map((job) => (
          <li key={job.company} className="mb-12">
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
              <header className="z-10 mt-1 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label={job.date || job.location}>
                {job.date || job.location}
              </header>
              <div className="z-10 sm:col-span-6">
                <Title job={job} />
                {job.date && job.location && <div className="text-slate-500">{job.location}</div>}
                <p className="mt-2 text-sm leading-normal">{job.description}</p>
                <TechList items={job.tech} label="Technologies used" />
              </div>
            </div>
          </li>
        ))}
      </ol>
      {profile.resume && (
        <div className="mt-12">
          <a
            className="group inline-flex items-baseline font-semibold leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
            href={profile.resume}
            target="_blank"
            rel="noreferrer noopener"
          >
            View Full Résumé
            <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
          </a>
        </div>
      )}
    </div>
  );
}
