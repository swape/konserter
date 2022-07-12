import { writable } from 'svelte/store'
import { fireSignIn, fireSignOut, init } from './fire.js'

export const showMenu = writable(false)

export const isAuthenticated = writable(false)
export let userObj = {}

init((data) => {
  console.info(data)
  if (data?.email) {
    isAuthenticated.set(true)
    userObj = data
  } else {
    userObj = {}
    isAuthenticated.set(false)
  }
})

export function signIn() {
  return fireSignIn()
  /* isAuthenticated.set(true)*/
}

export function signOut() {
  fireSignOut()
  isAuthenticated.set(false)
}
