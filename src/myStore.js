import { writable } from 'svelte/store'

export const showMenu = writable(false)

export const isAuthenticated = writable(false)

export function signIn() {
  isAuthenticated.set(true)
}

export function signOut() {
  isAuthenticated.set(false)
}
