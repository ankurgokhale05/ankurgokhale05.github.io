import { profile, socials } from '../data';
import { icons } from './Icons';
import { track } from '../analytics';

const sections = ['about', 'experience', 'skills', 'education', 'publications', 'projects'];

const navLine = 'mr-4 h-px w-8 bg-slate-600 transition-all motion-reduce:transition-none group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200';
const navText = 'text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 group-focus-visible:text-slate-200';

export default function Header({ active, onOpenResume }) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <a href="/">{profile.name}</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">{profile.title}</h2>
        <p className="mt-4 max-w-xs leading-normal">{profile.tagline}</p>
        {profile.openTo && (
          <div className="mt-5">
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent('Opportunity for Ankur Gokhale')}`}
              onClick={() => track('click-open-to-work', 'Clicked open to opportunities')}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 hover:border-emerald-300/60 hover:bg-emerald-400/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.openTo}
            </a>
          </div>
        )}

        <nav className="hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            {sections.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a className="group flex items-center py-3" href={`#${id}`} aria-current={isActive ? 'true' : undefined}>
                    <span
                      className={`mr-4 h-px transition-all motion-reduce:transition-none group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 ${
                        isActive ? 'w-16 bg-slate-200' : 'w-8 bg-slate-600'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 ${
                        isActive ? 'text-slate-200' : 'text-slate-400'
                      }`}
                    >
                      {id}
                    </span>
                  </a>
                </li>
              );
            })}
            {onOpenResume && (
              <li>
                <button type="button" onClick={onOpenResume} className="group flex items-center py-3 focus-visible:outline-none">
                  <span className={navLine} />
                  <span className={navText}>Resume</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
        {onOpenResume && (
          <button
            type="button"
            onClick={onOpenResume}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal-300/40 px-4 py-2 text-sm font-medium text-teal-300 hover:bg-teal-400/10 lg:hidden"
          >
            View Résumé
          </button>
        )}
      </div>

      <ul className="mt-8 ml-1 flex items-center" aria-label="Social media">
        {socials.map((s) => (
          <li key={s.name} className="mr-5 shrink-0 text-xs">
            <a
              className="block hover:text-slate-200"
              href={s.url}
              target={s.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer noopener"
              aria-label={s.url.startsWith('mailto:') ? s.name : `${s.name} (opens in a new tab)`}
              title={s.name}
              onClick={() => track(`click-${s.icon}`, `Clicked ${s.name}`)}
            >
              <span className="sr-only">{s.name}</span>
              {icons[s.icon]('h-6 w-6')}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
