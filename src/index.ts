import { formattedDate } from "./utils";
// export function streakCounter(storage: Storage, date: Date) {
//   return {}
// }

interface Streak {
  currentCount: number
  startDate: string
  lastLoginDate: string
}

export function streakCounter(storage: Storage, date: Date): Streak {
  return {
    currentCount: 1,
    // startDate: '12/1/2021',
    // lastLoginDate: '12/1/2021',
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  }
}
