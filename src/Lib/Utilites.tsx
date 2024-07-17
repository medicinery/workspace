import { customAlphabet } from "nanoid"
import { MONTH_NAMES } from "./Constants"
import { organizationStore, userStore } from "./State"

export namespace UI {
   export function closeDropdown() {
      document.getElementById("close-dropdown")?.click()
   }
}

export function getUserID(): string {
   return userStore.value()?.id ?? ""
}

export function getIsCoordinator(): boolean {
   return organizationStore.value()?.coordinator === getUserID()
}

export function generateID(): string {
   return customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 12)() // 36^12 = 4.7e18 possible combinations
}

export function getDate(): Date {
   const date = new Date()
   return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
   )
}

export function getTimestamp(): number {
   return getDate().getTime()
}

export function visualDate(timestamp: number, withYear?: boolean): string {
   const date = new Date(timestamp)
   return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}${
      withYear || getDate().getFullYear() != date.getFullYear() ? ", " + date.getFullYear() : ""
   }`
}

export function visualTime(timestamp: number): string {
   const date = new Date(timestamp)
   return `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
   }${date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}`
}

export function getRandomInt(min: number, max: number) {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min + 1)) + min
}
