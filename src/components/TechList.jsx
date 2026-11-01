export default function TechList({ items, label }) {
  return (
    <ul className="mt-2 flex flex-wrap" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="mt-2 mr-1.5">
          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">{t}</div>
        </li>
      ))}
    </ul>
  );
}
