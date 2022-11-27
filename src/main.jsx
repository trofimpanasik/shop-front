import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {App} from './App';
import { Provider } from 'react-redux'
import rootReducer from './redux/index'
import { createStore } from 'redux'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const firebaseConfig = {
  apiKey: "AIzaSyC1omO3gMu26SQ0s45CnezrOQiEfE1EHiA",
  authDomain: "shop-ba9bb.firebaseapp.com",
  projectId: "shop-ba9bb",
  storageBucket: "shop-ba9bb.appspot.com",
  messagingSenderId: "788185174609",
  appId: "1:788185174609:web:249eb0c1072a56bddfde70",
  measurementId: "G-SHBP0JLRG5"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const store = createStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable />
      <App />
    </Provider>
  </React.StrictMode>
)