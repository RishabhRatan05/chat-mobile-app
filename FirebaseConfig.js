import { initializeApp } from "firebase/app"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCjYK9e0AQYxeAW7QRhhFzGkA8AsOCrSV0",
  authDomain: "chat-app-3b73e.firebaseapp.com",
  databaseURL: "https://chat-app-3b73e-default-rtdb.firebaseio.com",
  projectId: "chat-app-3b73e",
  storageBucket: "chat-app-3b73e.appspot.com",
  messagingSenderId: "571182558152",
  appId: "1:571182558152:web:24cac5ce75e17b13ad6efd",
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export const userRef = collection(db, "users")

export const roomRef = collection(db, "rooms")
