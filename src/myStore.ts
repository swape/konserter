import {writable} from 'svelte/store'
import {fireSignIn, fireSignOut} from './fire.js'
import type {UserObjType ,ConcertObjectType} from './types'

export const showMenu = writable(false)
export const isAuthenticated = writable(false)
export const userObj = writable<UserObjType>({})
export const currentPage = writable<string>('start')
export const concerts = writable<ConcertObjectType[]>([])
export const currentConcertItem = writable<ConcertObjectType | null>(null)
export const searchedBandName = writable<string>('')

export async function signIn() {
	return await fireSignIn()
}

export function signOut() {
	fireSignOut()
	isAuthenticated.set(false)
}

currentPage.subscribe(() => {
	window.scrollTo(0, 0)
})
