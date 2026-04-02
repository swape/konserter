import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut, signInWithPopup, type User} from 'firebase/auth'
import {child, getDatabase, onValue, orderByChild, push, query, ref, update, remove, equalTo, limitToFirst} from 'firebase/database'

import {firebaseConfig, isDev} from './config'
import {isAuthenticated, userObj, concerts} from './myStore'
import type {UserObjType} from './types'

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export function initTheAuth(): void {
	onAuthStateChanged(auth, (dUser) => {
		if (dUser?.uid) {
			userObj.set(saveUser(dUser))
			isAuthenticated.set(true)
			syncItems(dUser?.uid, (concertObj) => {
				if (concertObj) {
					concerts.set(Object.values(concertObj))
				}
			})
		}
	})
}

export function fireSignOut(): void {
	signOut(auth)
}

export async function fireSignIn(): Promise<void> {
	if (isDev) {
		const userCred = await signInWithPopup(auth, provider)
		console.log('userCred', userCred)
	} else {
		signInWithRedirect(auth, provider)
	}
}

export const saveUser = (dUser: User): UserObjType => {
	return {
		uid: dUser.uid,
		email: dUser.email ?? undefined,
		img: dUser.photoURL ?? undefined,
		name: dUser.displayName ?? undefined
	}
}

export const addEntry = (name: string, data: object): Promise<object & {id: string | null}> => {
	return new Promise((resolve) => {
		const newPostKey = push(child(ref(database), name)).key
		const newObj = {
			...data,
			id: newPostKey
		}
		updateEntry(`${name}/${newPostKey}`, newObj)
		resolve(newObj)
	})
}

export const updateEntry = (name: string, data: object): Promise<void> => {
	return update(ref(database, name), data as Record<string, unknown>)
}

export const deleteEntry = (name: string): Promise<void> => {
	return remove(ref(database, name))
}

export const deleteEntryPathList = (pathList: string[]): Promise<void> => {
	const updates: Record<string, null> = {}
	pathList.forEach((pathName) => {
		updates[pathName] = null
	})
	return update(ref(database), updates)
}

export const syncItems = <T>(path: string, cb: (data: T) => void): void => {
	const results = query(ref(database, path))
	onValue(results, (data) => {
		cb(data.val())
	})
}

export const searchItems = <T>(path: string, searchKey: string, searchVal: string, cb: (data: T) => void, limit = 1): void => {
	const results = query(ref(database, path), orderByChild(searchKey), equalTo(searchVal), limitToFirst(limit))
	onValue(results, (data) => {
		cb(data.val())
	})
}
