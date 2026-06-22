import MetricCard from './MetricCard';
import EngineCard from './EngineCard';

export default function MetricsRow({ totalMonthlyBurn, upcomingRenewals }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <MetricCard
        title="Total Monthly Burn Rate"
        value={totalMonthlyBurn}
        description="Annual plans are normalized to a monthly value before aggregation."
        tone="cyan"
      />
      <MetricCard
        title="Upcoming Renewals Alert Count"
        value={upcomingRenewals}
        description="Renewals due within the next 7 days are flagged as urgent."
        tone="amber"
      />
      <EngineCard />
    </section>
  );
}
