export default function EngineCard() {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-lg md:col-span-2 xl:col-span-1">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Normalizing engine</p>
      <div className="mt-4 space-y-3 text-sm text-slate-300">
        <div className="flex items-center justify-between rounded-2xl bg-slate-950/45 px-4 py-3">
          <span>Monthly</span>
          <span className="font-semibold text-white">Cost = 1x</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-950/45 px-4 py-3">
          <span>Yearly</span>
          <span className="font-semibold text-white">Cost / 12</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-950/45 px-4 py-3">
          <span>Renewal window</span>
          <span className="font-semibold text-white">0 - 7 days</span>
        </div>
      </div>
    </article>
  );
}
