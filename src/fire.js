import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut, getRedirectResult} from 'firebase/auth'
import {child, getDatabase, onValue, push, query, ref, remove, set, update} from 'firebase/database'

import {firebaseConfig} from './config.js'
import {isAuthenticated, userObj ,concerts} from './myStore.ts'

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const database = getDatabase(app)
const provider = new GoogleAuthProvider()
	provider.setCustomParameters({
		redirect_uri: 'konserter.swape.net'
	})

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

export const init = (cb) => {
	if (auth.currentUser) {
		return cb(saveUser(auth.currentUser))
	}
	onAuthStateChanged(auth, (dUser) => {
		if (dUser?.uid) {
			cb(saveUser(dUser))
		} else {
			cb(null)
		}
	})

	getRedirectResult(auth)
		.then((result) => {
			const user = result.user
			if (user) {
				cb(saveUser(user))
			}
		})
		.catch(({code, message}) => {
			if (code) {
				console.error({code, message})
			}
		})
}

export const fireSignOut = () => signOut(auth)

export const fireSignIn = () => signInWithRedirect(auth, provider)

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
	} else {
		return null
	}
}

export const getData = (path) => {
	return new Promise((resolve, reject) => {
		const starCountRef = ref(database, path)
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()
			if (data) {
				resolve(data)
			} else {
				reject(new Error(`Could not find ${path}`))
			}
		})
	})
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

export const setEntry = (name, data) => {
	return set(ref(database, name), data)
}

export const deleteEntry = (name) => {
	return remove(ref(database, name))
}

export const syncItems = (path, cb) => {
	const results = query(ref(database, path))

	onValue(results, (data) => {
		cb(data.val())
	})
}
