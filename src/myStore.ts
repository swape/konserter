import { writable } from 'svelte/store'
import { fireSignIn, fireSignOut, init } from './fire.js'
import type { UserObjType } from './types'

export const showMenu = writable(false)

export const isAuthenticated = writable(false)

export let userObj: UserObjType = {}

init((data: UserObjType) => {
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
}

export function signOut() {
  fireSignOut()
  isAuthenticated.set(false)
}
