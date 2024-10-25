import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase 인증 기능 사용

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCo491HJ9h-z95iW93YaibZWm_b8V-PzqU",
  authDomain: "pillpopappdemo.firebaseapp.com",
  projectId: "pillpopappdemo",
  storageBucket: "pillpopappdemo.appspot.com",
  messagingSenderId: "452394592278",
  appId: "1:452394592278:web:e1dd5056410954b9ce6d37",
  measurementId: "G-V905HN727H",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 객체 가져오기
export const auth = getAuth(app);
