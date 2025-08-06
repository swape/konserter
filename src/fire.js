import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut, signInWithPopup} from 'firebase/auth'
import {child, getDatabase, onValue, push, query, ref, update} from 'firebase/database'

import {firebaseConfig, isDev} from './config.js'
import {isAuthenticated, userObj, concerts} from './myStore.ts'

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export function initTheAuth() {
	onAuthStateChanged(auth, (dUser) => {
		if (dUser?.uid) {
			userObj.set(saveUser(dUser))
			isAuthenticated.set(true)
			syncItems(dUser?.uid, (concertObj) => {
				if (concertObj) {
					concerts.set([...Object.values(concertObj)])
				}
			})
		}
	})
}

export function fireSignOut() {
	signOut(auth)
}

export async function fireSignIn() {
	if (isDev) {
		const userCred = await signInWithPopup(auth, provider)
		console.log('userCred', userCred)
	} else {
		signInWithRedirect(auth, provider)
	}
}

export const saveUser = (dUser) => {
	if (dUser) {
		return {
			uid: dUser.uid,
			email: dUser.email,
			emailVerified: dUser.emailVerified,
			img: dUser.photoURL,
			name: dUser.displayName,
			firstName: dUser.displayName.split(' ')[0]
		}
	}
	return null
}

export const addEntry = (name, data) => {
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

export const updateEntry = (name, data) => {
	return update(ref(database, name), data)
}

export const deleteEntry = (name) => {
	return update(ref(database, name), null)
}

export const deleteEntryPathList = (pathList) => {
	const updates = {}
	pathList.forEach((pathName) => {
		updates[pathName] = null
	})
	return update(ref(database), updates)
}

export const syncItems = (path, cb) => {
	const results = query(ref(database, path))

	onValue(results, (data) => {
		cb(data.val())
	})
}
