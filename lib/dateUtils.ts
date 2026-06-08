const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(d: Date): string {
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export function formatTime(h: number, m: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function formatTimeFromISO(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return formatTime(d.getHours(), d.getMinutes());
}

export function formatDateFromISO(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDisplay(date: Date): string {
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function buildDatetime(date: Date, hour: number, minute: number): Date {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export function toISO(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

export function parseHour(iso: string): number {
  return iso ? new Date(iso).getHours() : 10;
}
export function parseMinute(iso: string): number {
  return iso ? new Date(iso).getMinutes() : 0;
}
export function parseDate(iso: string): Date {
  return iso ? new Date(iso) : new Date();
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isInRange(date: Date, start: Date, end: Date): boolean {
  const d = date.getTime();
  return d > start.getTime() && d < end.getTime();
}

export function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  return d;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getDefaultDatetimes() {
  const now = new Date();
  const pickup = new Date(now);
  pickup.setHours(now.getHours() + 2, 0, 0, 0);
  const dropoff = new Date(pickup);
  dropoff.setDate(dropoff.getDate() + 1);
  return { pickup, dropoff };
}
