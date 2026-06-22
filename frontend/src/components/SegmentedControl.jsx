export default function SegmentedControl({ options, value, onChange, className = '', size = 'md' }) {
  const sizeClasses = size === 'sm' ? 'gap-2 p-1.5' : 'gap-3 p-2';
  const buttonSizeClasses = size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm';

  return (
    <div className={`grid rounded-2xl border border-white/10 bg-white/5 ${sizeClasses} ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={
            `rounded-xl font-semibold transition ${buttonSizeClasses} ${
              value === option.value
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`
          }
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
