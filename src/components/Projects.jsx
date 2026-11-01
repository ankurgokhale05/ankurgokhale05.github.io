import { projects } from '../data';
import { ArrowUpRight, ArrowRight } from './Icons';
import TechList from './TechList';

export default function Projects() {
  return (
    <div>
      <ul className="group/list">
        {projects.map((p) => (
          <li key={p.title} className="mb-12">
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3>
                  <a
                    className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${p.title} (opens in a new tab)`}
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                    <span>
                      {p.title}
                      <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </a>
                </h3>
                <p className="mt-2 text-sm leading-normal">{p.description}</p>
                <TechList items={p.tech} label="Technologies used" />
              </div>
              <img
                alt=""
                loading="lazy"
                src={`${import.meta.env.BASE_URL}${p.image}`}
                className="aspect-video rounded border-2 border-slate-200/10 object-cover transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                width="200"
                height="112"
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <a
          className="group inline-flex items-baseline font-semibold leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
          href="https://github.com/ankurgokhale05?tab=repositories"
          target="_blank"
          rel="noreferrer noopener"
        >
          View All Projects on GitHub
          <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
        </a>
      </div>
    </div>
  );
}
