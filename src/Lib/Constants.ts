/* --- Flagable constants --- */

export const GITHUB_URI = "https:/github.com/medicinery"
export const BASE_URL = "TODO: YET TO BE DECIDED"
export const IS_DEBUG = process.env.NODE_ENV === "development"

/* --- Adjustable constants --- */

export const USE_PRODUCTION_DB = false
export const DANGER_ZONE_VISIBLE = location.origin !== BASE_URL

/* --- UI defaults/constants --- */

export const DEFAULT_SCALE = 1

/* --- Universal contants --- */

export const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
export const DAYS_IN_MONTHS: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const MONTH_NAMES = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sept",
   "Oct",
   "Nov",
   "Dec",
]
