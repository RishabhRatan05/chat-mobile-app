import { initializeApp } from "firebase/app"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DB_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_M_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export const userRef = collection(db, "users")

export const roomRef = collection(db, "rooms")
