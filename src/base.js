import Rebase from "re-base"
import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAlHjVq6Y6HGR5g-2uslyztTWlDvfSzhGQ",
  authDomain: "catch-of-the-day-davidportilla.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-davidportilla.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

// this is a named export
export { firebaseApp }

// this is a default export
export default base