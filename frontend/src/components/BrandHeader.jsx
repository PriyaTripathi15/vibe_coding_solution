export default function BrandHeader({ totalItems, pausedItems }) {
  return (
    <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-200">
            Cash-flow command center
          </div>
          <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            PulseLedger
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Track recurring SaaS and streaming subscriptions, normalize annual costs into a monthly burn rate,
            and surface renewals before they hit the card.
          </p>
        </div>
        <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Reference date</p>
            <p className="mt-2 text-base font-semibold text-white">{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Active items</p>
            <p className="mt-2 text-base font-semibold text-white">{totalItems}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Paused items</p>
            <p className="mt-2 text-base font-semibold text-white">{pausedItems}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
