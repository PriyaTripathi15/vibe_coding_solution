import { useState } from 'react';
import CalendarDatePicker from './CalendarDatePicker';
import SegmentedControl from './SegmentedControl';

const emptyForm = {
  serviceName: '',
  cost: '',
  billingCycle: 'Monthly',
  renewalDate: '',
};

export default function SubscriptionForm({ onSubmit, disabled }) {
  const [form, setForm] = useState(emptyForm);

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.serviceName.trim() || !form.cost || !form.renewalDate) {
      return;
    }

    onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-6 shadow-glow backdrop-blur-xl"
    >
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Onboarding form</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Add a recurring subscription</h2>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Service name</span>
          <input
            type="text"
            value={form.serviceName}
            onChange={(event) => setForm((current) => ({ ...current, serviceName: event.target.value }))}
            placeholder="Netflix, Figma, Notion..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/10"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Cost</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.cost}
            onChange={(event) => setForm((current) => ({ ...current, cost: event.target.value }))}
            placeholder="0.00"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/10"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Billing cycle</span>
          <SegmentedControl
            value={form.billingCycle}
            onChange={(billingCycle) => setForm((current) => ({ ...current, billingCycle }))}
            options={[
              { value: 'Monthly', label: 'Monthly' },
              { value: 'Yearly', label: 'Yearly' },
            ]}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Next renewal date</span>
          <CalendarDatePicker
            value={form.renewalDate}
            onChange={(renewalDate) => setForm((current) => ({ ...current, renewalDate }))}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600 px-4 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Add subscription
      </button>
    </form>
  );
}
