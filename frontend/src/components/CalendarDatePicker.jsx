import { useMemo, useState } from 'react';

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function formatMonthLabel(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCalendarDays(viewDate) {
  const firstDay = startOfMonth(viewDate);
  const startDay = new Date(firstDay);
  startDay.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(startDay);
    current.setDate(startDay.getDate() + index);
    return current;
  });
}

export default function CalendarDatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      return startOfMonth(new Date(`${value}T00:00:00`));
    }

    return startOfMonth(new Date());
  });

  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;
  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);

  function handleSelect(date) {
    onChange(formatInputDate(date));
    setViewDate(startOfMonth(date));
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white outline-none transition hover:bg-white/10 focus:border-blue-400/60"
      >
        <span className={value ? 'text-white' : 'text-slate-500'}>
          {value ? new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }).format(selectedDate) : 'Select renewal date'}
        </span>
        <span className="text-xs uppercase tracking-[0.28em] text-slate-400">Calendar</span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+0.75rem)] z-20 w-full min-w-[320px] rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-4 shadow-glow backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Prev
            </button>
            <div className="text-sm font-semibold text-white">{formatMonthLabel(viewDate)}</div>
            <button
              type="button"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Next
            </button>
          </div>

          <div className="mb-3 grid grid-cols-7 text-center text-[10px] uppercase tracking-[0.28em] text-slate-500">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const isCurrentMonth = day.getMonth() === viewDate.getMonth();
              const isSelected = selectedDate && formatInputDate(day) === formatInputDate(selectedDate);
              const today = new Date();
              const isToday = formatInputDate(day) === formatInputDate(today);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleSelect(day)}
                  className={
                    `grid h-10 place-items-center rounded-xl text-sm transition ${
                      isSelected
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : isCurrentMonth
                          ? 'bg-white/5 text-slate-100 hover:bg-white/10'
                          : 'bg-transparent text-slate-600 hover:bg-white/5'
                    } ${isToday && !isSelected ? 'ring-1 ring-blue-400/50' : ''}`
                  }
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => onChange('')}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
