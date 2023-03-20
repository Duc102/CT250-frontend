import React from 'react'
import {useState} from 'react'
import Header from './Header'
import Body from './Body'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import Footer from './Footer'
import { Route, Routes } from 'react-router-dom'
import Register from './AuthenticationComponent/Register'
import Login from './AuthenticationComponent/Login'

export default function User() {
  const [siteUser, setSiteUser] = useState({
    id: 0,
    name: 'guest'
  }) 
  return (
    <div className="container">
        <Header />
            <Routes>
                <Route path='/' element={<Body user={siteUser}/>}></Route>
                <Route path='/shoppingCart' element={<ShoppingCart/>}></Route>
                <Route path='/another' element={<h1>Another</h1>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login exe={setSiteUser}/>}></Route>
            </Routes>
        <Footer />
    </div>
  )
}
