import React, {useEffect, useState, lazy, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {Header} from "./components/header/Header.jsx";
// const Product = lazy(() => import(`./components/product/Product.jsx`))
// const Login = lazy(() => import(`./components/auth/login/Login.jsx`))
// const NotFound = lazy(() => import(`./components/notfound/NotFound.jsx`))
// const Reg = lazy(() => import(`./components/auth/reg/Reg`))
// const Profile = lazy(() => import(`./components/profile/Profile.jsx`))
import {Product} from "./components/product/product/Product.jsx";
import {Login} from "./components/auth/login/Login.jsx";
import {NotFound} from "./components/notfound/NotFound.jsx";
import {Reg} from "./components/auth/reg/Reg.jsx";
import {Profile} from "./components/profile/Profile.jsx";
import {request} from "./requests/request.js";
import {toast} from "react-toastify";
import {Home} from "./components/home/Home.jsx";
import {ProductsList} from "./components/product/productList/ProductsList";

export const App = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    const auth = async () => {
      const res  = await request('/auth/auth', {}, 'get')
      if(res?.text){
        toast(res.text, {type: 'error'})
      } else {
        localStorage.setItem('key', res.key)
        dispatch({type: 'SET_USER', payload: {user: res.user,  isAuth: true}})
      }
    }
    auth()
  }, [])
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/reg" element={<Reg />} />
        <Route path="/:id"  element={<Profile/>}/>
        <Route path="/products/:category" element={<ProductsList />}/>
        <Route path="/products/:category/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}