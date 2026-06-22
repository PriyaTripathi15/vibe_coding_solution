import { useEffect, useMemo, useState } from 'react';
import BrandHeader from './components/BrandHeader';
import SubscriptionFilters from './components/SubscriptionFilters';
import MetricsRow from './components/MetricsRow';
import SubscriptionForm from './components/SubscriptionForm';
import SubscriptionTable from './components/SubscriptionTable';
import {
  createSubscription,
  getSubscriptions,
  updateSubscriptionStatus,
} from './lib/subscriptions';
import {
  getDaysUntil,
  getMonthlyEquivalent,
  toInputDate,
} from './utils/finance';

const REFERENCE_DATE = new Date('2026-06-22T00:00:00');

function mapSubscription(subscription) {
  const renewalDate = subscription.renewalDate;
  const daysLeft = getDaysUntil(renewalDate, REFERENCE_DATE);
  const monthlyCost = getMonthlyEquivalent(subscription.cost, subscription.billingCycle);

  return {
    ...subscription,
    renewalDate: toInputDate(renewalDate),
    monthlyCost,
    daysLeft,
    isRenewingSoon: typeof daysLeft === 'number' && daysLeft >= 0 && daysLeft <= 7,
    isOverdue: typeof daysLeft === 'number' && daysLeft < 0,
  };
}

export default function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cycleFilter, setCycleFilter] = useState('All');

  useEffect(() => {
    let mounted = true;

    async function loadSubscriptions() {
      try {
        setIsLoading(true);
        const data = await getSubscriptions();

        if (!mounted) {
          return;
        }

        setSubscriptions(Array.isArray(data) ? data.map(mapSubscription) : []);
        setError('');
      } catch (requestError) {
        if (mounted) {
          setError(requestError.message || 'Failed to load subscriptions.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadSubscriptions();

    return () => {
      mounted = false;
    };
  }, []);

  const metrics = useMemo(() => {
    const activeSubscriptions = subscriptions.filter((item) => item.status === 'Active');
    const totalMonthlyBurn = activeSubscriptions.reduce((sum, item) => sum + item.monthlyCost, 0);
    const upcomingRenewals = activeSubscriptions.filter((item) => item.isRenewingSoon).length;
    const pausedItems = subscriptions.filter((item) => item.status === 'Paused').length;

    return {
      totalMonthlyBurn,
      upcomingRenewals,
      pausedItems,
    };
  }, [subscriptions]);

  const visibleSubscriptions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return subscriptions.filter((subscription) => {
      const matchesSearch =
        !normalizedSearch || subscription.serviceName.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === 'All' || subscription.status === statusFilter;
      const matchesCycle = cycleFilter === 'All' || subscription.billingCycle === cycleFilter;

      return matchesSearch && matchesStatus && matchesCycle;
    });
  }, [subscriptions, searchTerm, statusFilter, cycleFilter]);

  async function handleCreateSubscription(form) {
    try {
      setError('');
      const created = await createSubscription({
        serviceName: form.serviceName.trim(),
        cost: Number(form.cost),
        billingCycle: form.billingCycle,
        renewalDate: form.renewalDate,
      });

      setSubscriptions((current) => [mapSubscription(created), ...current]);
    } catch (requestError) {
      setError(requestError.message || 'Failed to create subscription.');
    }
  }

  async function handleToggleStatus(subscription) {
    const nextStatus = subscription.status === 'Active' ? 'Paused' : 'Active';
    const optimisticId = subscription._id || subscription.id;

    setSubscriptions((current) =>
      current.map((item) =>
        (item._id || item.id) === optimisticId ? { ...item, status: nextStatus } : item,
      ),
    );

    try {
      const updated = await updateSubscriptionStatus(optimisticId, nextStatus);
      setSubscriptions((current) =>
        current.map((item) =>
          (item._id || item.id) === optimisticId ? mapSubscription(updated) : item,
        ),
      );
    } catch (requestError) {
      setSubscriptions((current) =>
        current.map((item) =>
          (item._id || item.id) === optimisticId ? { ...item, status: subscription.status } : item,
        ),
      );
      setError(requestError.message || 'Failed to update subscription.');
    }
  }

  return (
    <div className="min-h-screen bg-dashboard-radial text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <BrandHeader totalItems={subscriptions.length} pausedItems={metrics.pausedItems} />

        {error ? (
          <div className="rounded-2xl border border-blue-400/30 bg-blue-400/10 px-4 py-3 text-sm text-blue-100">
            {error}
          </div>
        ) : null}

        <MetricsRow
          totalMonthlyBurn={new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
          }).format(metrics.totalMonthlyBurn)}
          upcomingRenewals={metrics.upcomingRenewals}
        />

        <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <SubscriptionForm onSubmit={handleCreateSubscription} disabled={isLoading} />
          {isLoading ? (
            <div className="grid place-items-center rounded-[1.75rem] border border-white/10 bg-white/5 p-10 text-slate-300 shadow-glow backdrop-blur-xl">
              Loading subscriptions...
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <SubscriptionFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                cycleFilter={cycleFilter}
                onCycleChange={setCycleFilter}
                visibleCount={visibleSubscriptions.length}
                totalCount={subscriptions.length}
              />
              <SubscriptionTable subscriptions={visibleSubscriptions} onToggleStatus={handleToggleStatus} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
