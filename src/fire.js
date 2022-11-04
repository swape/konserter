// @ts-nocheck

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth'
import { child, getDatabase, onValue, push, query, ref, remove, set, update } from 'firebase/database'

import { firebaseConfig } from './config.js'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const database = getDatabase(app)
const provider = new GoogleAuthProvider()

export const init = (cb) => {
  if (auth.currentUser) {
    return cb(saveUser(auth.currentUser))
  }
  onAuthStateChanged(auth, (dUser) => {
    console.log({dUser})
    if (dUser && dUser.uid) {
      cb(saveUser(dUser))
    } else {
      cb(null)
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
    // setEntry(`profile/${user.uid}`, user)
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
        reject(new Error('Could not find ' + path))
      }
    })
  })
}

// export const getProfile = (uid) => getData('profile/' + uid)

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

// export const syncItemsFilteredByUid = (path, uid, cb) => {
//   const results = query(ref(database, path), orderByChild('uid'), equalTo(uid))

//   onValue(results, (data) => {
//     cb(data.val())
//   })
// }

// export const findUserByEmail = (email, cb) => {
//   const results = query(ref(database, 'profile'), orderByChild('email'), equalTo(email))

//   onValue(
//     results,
//     (data) => {
//       cb(data.val())
//     },
//     {
//       onlyOnce: true
//     }
//   )
// }

export const syncItems = (path, cb) => {
  const results = query(ref(database, path))

  onValue(results, (data) => {
    cb(data.val())
  })
}
