import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6oUl58eZjWVhV9CQPh47uxOdQpR4aUv4",
    authDomain: "class-align.firebaseapp.com",
    projectId: "class-align",
    storageBucket: "class-align.firebasestorage.app",
    messagingSenderId: "196187139050",
    appId: "1:196187139050:web:940fa3b418d3953ed3a093"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };