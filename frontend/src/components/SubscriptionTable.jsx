import { formatCurrency, formatDate } from '../utils/finance';

export default function SubscriptionTable({ subscriptions, onToggleStatus }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-glow backdrop-blur-xl">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Subscription grid</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Active burn map</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1260px] divide-y divide-white/10 text-left table-fixed">
          <thead className="bg-slate-950/40 text-[11px] uppercase tracking-[0.28em] text-slate-400">
            <tr>
              <th className="w-[25%] px-4 py-4">Service</th>
              <th className="w-[10%] px-3 py-4">Cycle</th>
              <th className="w-[12%] px-3 py-4">Cost</th>
              <th className="w-[14%] px-3 py-4">Monthly eq.</th>
              <th className="w-[16%] px-3 py-4">Renewal</th>
              <th className="w-[10%] px-3 py-4">Days left</th>
              <th className="w-[10%] px-3 py-4">Status</th>
              <th className="w-[13%] px-3 py-4">Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {subscriptions.map((subscription) => (
              <tr
                key={subscription._id || subscription.id}
                className={
                  subscription.status === 'Paused'
                    ? 'bg-slate-900/60 opacity-55'
                    : subscription.isOverdue
                      ? 'bg-blue-950/45'
                      : subscription.isRenewingSoon
                        ? 'bg-blue-400/10'
                        : 'bg-transparent'
                }
              >
                <td className="px-4 py-4 align-top">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
                      {subscription.serviceName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{subscription.serviceName}</p>
                      {subscription.isRenewingSoon ? (
                        <span className="mt-1 inline-flex rounded-full border border-blue-300/30 bg-blue-300/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-100">
                          Renewing Soon
                        </span>
                      ) : null}
                      {subscription.isOverdue ? (
                        <span className="mt-1 inline-flex rounded-full border border-sky-300/30 bg-sky-300/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-100">
                          Overdue
                        </span>
                      ) : null}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-slate-300 whitespace-nowrap">{subscription.billingCycle}</td>
                <td className="px-3 py-4 text-sm text-slate-300 whitespace-nowrap">{formatCurrency(subscription.cost)}</td>
                <td className="px-3 py-4 text-sm font-semibold text-white whitespace-nowrap">{formatCurrency(subscription.monthlyCost)}</td>
                <td className="px-3 py-4 text-sm text-slate-300 whitespace-nowrap">{formatDate(subscription.renewalDate)}</td>
                <td className="px-3 py-4 text-sm text-slate-300 whitespace-nowrap">
                  {subscription.daysLeft === null ? '-' : `${subscription.daysLeft} days`}
                </td>
                <td className="px-3 py-4">
                  <span
                    className={
                      subscription.status === 'Active'
                              ? 'inline-flex rounded-full border border-blue-300/25 bg-blue-300/15 px-3 py-1 text-xs font-semibold text-blue-100'
                        : 'inline-flex rounded-full border border-slate-300/20 bg-slate-300/10 px-3 py-1 text-xs font-semibold text-slate-200'
                    }
                  >
                    {subscription.status}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <button
                    type="button"
                    onClick={() => onToggleStatus(subscription)}
                    className={
                      `relative inline-flex h-8 w-16 items-center rounded-full border transition ${
                        subscription.status === 'Active'
                                ? 'border-blue-300/40 bg-blue-500/70'
                          : 'border-white/10 bg-slate-700'
                      }`
                    }
                    aria-label={`Toggle ${subscription.serviceName}`}
                  >
                    <span
                      className={
                        `inline-block h-6 w-6 rounded-full bg-white shadow transition-transform ${
                          subscription.status === 'Active' ? 'translate-x-9' : 'translate-x-1'
                        }`
                      }
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
