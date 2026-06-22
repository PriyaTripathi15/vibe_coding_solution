export default function MetricCard({ title, value, description, tone = 'blue' }) {
  const tones = {
    blue: 'border-blue-400/20 bg-blue-500/10 text-blue-50/80',
    deepBlue: 'border-sky-400/20 bg-sky-500/10 text-sky-50/80',
  };

  return (
    <article className={`rounded-[1.75rem] border p-6 shadow-glow backdrop-blur-lg ${tones[tone]}`}>
      <p className="text-xs uppercase tracking-[0.35em] opacity-75">{title}</p>
      <p className="font-display mt-4 text-4xl text-white sm:text-5xl">{value}</p>
      <p className="mt-3 text-sm">{description}</p>
    </article>
  );
}
