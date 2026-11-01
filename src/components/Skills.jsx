import { skills } from '../data';
import TechList from './TechList';

export default function Skills() {
  return (
    <dl className="space-y-6">
      {skills.map(({ group, items }) => (
        <div key={group} data-reveal className="grid sm:grid-cols-8 sm:gap-8 md:gap-4">
          <dt className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2">{group}</dt>
          <dd className="sm:col-span-6">
            <TechList items={items} label={group} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
