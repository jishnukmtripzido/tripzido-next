export interface RentalHint {
  title: string;
  subtitle: string;
}

export function getRentalDurationHint(
  pickup: Date,
  dropoff: Date,
): RentalHint | null {
  const diffMs = dropoff.getTime() - pickup.getTime();
  if (diffMs <= 0) return null;

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const extraMinutes = totalMinutes - days * 1440;

  if (days < 1 || extraMinutes <= 0 || extraMinutes > 240) {
    return null;
  }

  const durationLabel = formatDuration(extraMinutes);

  return {
    // title: `${durationLabel} shorter = ${days} day${days === 1 ? "" : "s"} cheaper`,
    title: `${durationLabel} shorter = 1 day cheaper`,
    subtitle: `If you take ${durationLabel} off your rental, you'll pay for ${days} day${
      days === 1 ? "" : "s"
    } – not ${days + 1}`,
  };
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;

  if (hours > 0) {
    if (remainderMinutes > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ${remainderMinutes} minute${
        remainderMinutes === 1 ? "" : "s"
      }`;
    }
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }

  return `${remainderMinutes} minute${remainderMinutes === 1 ? "" : "s"}`;
}
