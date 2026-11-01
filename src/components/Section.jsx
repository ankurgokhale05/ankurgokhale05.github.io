// A page section with a small uppercase heading.
// Phones: the heading sticks to the top while you scroll through the section.
// Desktop: it sits above the section with a thin rule, since the left nav already tracks position.
export default function Section({ id, label, children }) {
  return (
    <section id={id} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-labelledby={`${id}-heading`}>
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:static lg:mx-0 lg:mb-10 lg:flex lg:w-full lg:items-center lg:gap-4 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <h2 id={`${id}-heading`} className="shrink-0 text-sm font-bold uppercase tracking-widest text-slate-200">
          {label}
        </h2>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-slate-700/60 lg:block" />
      </div>
      {children}
    </section>
  );
}
