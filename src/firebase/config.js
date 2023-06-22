
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyBGdJf8CmzIAbvSGBldcjJyQVo4cORyu4A",
    authDomain: "library-management-app-8ce87.firebaseapp.com",
    projectId: "library-management-app-8ce87",
    storageBucket: "library-management-app-8ce87.appspot.com",
    messagingSenderId: "436336767963",
    appId: "1:436336767963:web:368cd8329909caa2042dfe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);






// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"
// import { getFirestore } from "firebase/firestore"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCjz7bEKIAlTulaQxX2mKkL-Vsl_S_3RgA",
//     authDomain: "library-system-727ad.firebaseapp.com",
//     projectId: "library-system-727ad",
//     storageBucket: "library-system-727ad.appspot.com",
//     messagingSenderId: "1092638535325",
//     appId: "1:1092638535325:web:992be66c88636a77acee74"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const db = getFirestore(app);
