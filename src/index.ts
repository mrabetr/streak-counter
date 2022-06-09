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

function shouldIncrementOrResetStreakCount(
  currentDate: Date,
  lastLoginDate: string,
): 'increment' | undefined {
  // We get 11/5/2021
  // so to get 5, we split on / and get the second item
  const difference =
    currentDate.getDate() - parseInt(lastLoginDate.split('/')[1])
  // This means they logged in the day after the currentDate
  if (difference === 1) {
    return 'increment'
  }
  // Otherwise they logged in after a day, which would
  // break the streak
  return undefined
}

export function streakCounter(storage: Storage, date: Date): Streak {
  const streakInLocalStorage = storage.getItem(KEY);

  if (streakInLocalStorage) {
    try {
      const streak = JSON.parse(streakInLocalStorage);
      // const state = "increment";
      const state = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate)
      const SHOULD_INCREMENT = state === "increment";

      if (SHOULD_INCREMENT) {
        const updatedStreak = {
          ...streak,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formattedDate(date),
        };

        return updatedStreak;
      }

      return streak;
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  const streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  }

  // store in localStorage
  storage.setItem(KEY, JSON.stringify(streak))

  return streak
}
