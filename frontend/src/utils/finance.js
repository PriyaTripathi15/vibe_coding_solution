export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

export function formatDate(dateValue) {
  if (!dateValue) {
    return '-';
  }

  const date = new Date(dateValue);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function toInputDate(dateValue) {
  if (!dateValue) {
    return '';
  }

  const date = new Date(dateValue);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDaysUntil(dateValue, referenceDate = new Date()) {
  if (!dateValue) {
    return null;
  }

  const current = Date.UTC(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );
  const targetDate = new Date(dateValue);
  const target = Date.UTC(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );

  return Math.round((target - current) / (1000 * 60 * 60 * 24));
}

export function getMonthlyEquivalent(cost, billingCycle) {
  const numericCost = Number(cost || 0);
  return billingCycle === 'Yearly' ? numericCost / 12 : numericCost;
}
