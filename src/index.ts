import { formattedDate } from "./utils";
// export function streakCounter(storage: Storage, date: Date) {
//   return {}
// }

interface Streak {
  currentCount: number
  startDate: string
  lastLoginDate: string
}

// Used when storing in localStorage
const KEY = 'streak'

export function streakCounter(storage: Storage, date: Date): Streak {
  const streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  }

  // store in localStorage
  storage.setItem(KEY, JSON.stringify(streak))

  return streak
}
