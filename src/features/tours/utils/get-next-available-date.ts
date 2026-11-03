const DAY_NAME_TO_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

/**
 * Returns the next available date formatted as YYYY-MM-DD.
 * If availableDays are specified, finds the next valid weekday starting tomorrow.
 * Otherwise, defaults to tomorrow.
 */
export function getNextAvailableDate(availableDays?: string[]): string {
  const date = new Date();
  date.setDate(date.getDate() + 1); // Start from tomorrow

  if (availableDays && availableDays.length > 0) {
    const validDayIndices = new Set(
      availableDays
        .map((d) => DAY_NAME_TO_INDEX[d])
        .filter((v) => v !== undefined)
    );

    if (validDayIndices.size > 0) {
      for (let i = 0; i < 14; i++) {
        if (validDayIndices.has(date.getDay())) {
          break;
        }
        date.setDate(date.getDate() + 1);
      }
    }
  }

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

