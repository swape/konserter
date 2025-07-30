import {writable} from 'svelte/store'
import {fireSignIn, fireSignOut} from './fire.js'
import type {UserObjType} from './types'

export const showMenu = writable(false)
export const isAuthenticated = writable(false)
export const userObj = writable<UserObjType>({})
export const currentPage = writable('start')
export const concerts = writable([])
export const currentConcertItem = writable()
export const searchedBandName = writable('')

export async function signIn() {
	return await fireSignIn()
}

export function signOut() {
	fireSignOut().finally(() => {
		isAuthenticated.set(false)
	})
}
