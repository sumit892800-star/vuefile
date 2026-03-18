import { initializeApp, getApps } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

const getFirebaseAuth = () => {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase config missing")
  }

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  return getAuth(app)
}

export const signInWithGoogle = async () => {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  const idToken = await result.user.getIdToken()

  return {
    idToken,
    email: result.user.email,
    name: result.user.displayName
  }
}
