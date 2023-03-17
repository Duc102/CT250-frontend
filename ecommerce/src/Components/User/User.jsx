import React from 'react'
import Header from './Header'
import Body from './Body'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import Footer from './Footer'
import { Route, Routes } from 'react-router-dom'

export default function User() {
  return (
    <div className="container">
        <Header />
            <Routes>
                <Route path='/' element={<Body/>}></Route>
                <Route path='/shoppingCart' element={<ShoppingCart/>}></Route>
                <Route path='/another' element={<h1>Another</h1>}></Route>
            </Routes>
        <Footer />
    </div>
  )
}
