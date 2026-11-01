import { profile, socials } from '../data';
import { icons } from './Icons';
import { track } from '../analytics';

const sections = ['about', 'experience', 'education', 'projects'];

const navLine = 'mr-4 h-px w-8 bg-slate-600 transition-all motion-reduce:transition-none group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200';
const navText = 'text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200';

export default function Header({ active, onOpenResume }) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <a href="/">{profile.name}</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">{profile.title}</h2>
        <p className="mt-4 max-w-xs leading-normal">{profile.tagline}</p>

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
                        isActive ? 'text-slate-200' : 'text-slate-500'
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
              aria-label={`${s.name} (opens in a new tab)`}
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
