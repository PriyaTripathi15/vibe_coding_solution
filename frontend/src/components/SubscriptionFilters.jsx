import { useState } from 'react';
import SegmentedControl from './SegmentedControl';

export default function SubscriptionFilters({ searchTerm, onSearchChange, statusFilter, onStatusChange, cycleFilter, onCycleChange, visibleCount, totalCount }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-3 backdrop-blur-xl">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.28em] text-slate-500">Search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search service name..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/10"
            />
          </label>

          <div className="flex items-center gap-3 lg:justify-end">
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {isOpen ? 'Hide filters' : 'Show filters'}
            </button>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 lg:text-right">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Visible rows</p>
              <p className="mt-1 text-base font-semibold text-white">
                {visibleCount} / {totalCount}
              </p>
            </div>
          </div>
        </div>

        {isOpen ? (
          <div className="grid gap-3 lg:grid-cols-[minmax(0,260px)_190px_190px_auto] lg:items-end">
            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.28em] text-slate-500">Status</span>
              <SegmentedControl
                value={statusFilter}
                onChange={onStatusChange}
                size="sm"
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'Active', label: 'Active' },
                  { value: 'Paused', label: 'Paused' },
                ]}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.28em] text-slate-500">Cycle</span>
              <SegmentedControl
                value={cycleFilter}
                onChange={onCycleChange}
                size="sm"
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'Monthly', label: 'Monthly' },
                  { value: 'Yearly', label: 'Yearly' },
                ]}
              />
            </label>

            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onStatusChange('All');
                onCycleChange('All');
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
