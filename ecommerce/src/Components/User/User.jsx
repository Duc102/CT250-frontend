import React from 'react'
import { useState, useEffect } from 'react'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Header from './Header'
import Body from './Body'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import Footer from './Footer'
import { Route, Routes } from 'react-router-dom'
import Register from './AuthenticationComponent/Register'
import Login from './AuthenticationComponent/Login'

import UserContext from './UserContext'
import ShoppingCartService from '../../Services/CommonService/ShoppingCartService'
import ItemDetail from './ProductItemDetailComponent/ItemDetail'

export default function User() {
  const [siteUser, setSiteUser] = useState({
    id: 0,
    name: 'guest'
  })

  const [shoppingCart, setShoppingCart] = useState({
    id: 0,
  })

  useEffect(() => {
    if (window.localStorage.getItem("siteUser") == null) {
      window.localStorage.setItem("siteUser", JSON.stringify(siteUser));
    } else {
      setSiteUser(JSON.parse(window.localStorage.getItem("siteUser")));
    }
  }, [])

  useEffect(() => {
    if (siteUser.id) {
      console.log(siteUser);
      window.localStorage.setItem("siteUser", JSON.stringify(siteUser));
      ShoppingCartService.getShoppingCartByUserId(siteUser.id).then(response => {
        setShoppingCart(response.data);
        console.log("Load shopping cart when login ", response.data);
      })
    }
  }, [siteUser])
  return (
    <PayPalScriptProvider options={{'client-id': 'AcTNYTNbAI4aec7RTprvYmE5PDuestOTtOccvQWjL-tfFc91XAXPd8x2zhgUgZz6ftI4crwINV5BPPmD', locale: 'en_US', "disable-funding": 'card'}}>
      <div className="container">
        <UserContext.Provider value={{ siteUser: siteUser, shoppingCart: shoppingCart, setShoppingCart: setShoppingCart }}>
          <Header />
          <Routes>
            <Route path='/' element={<Body user={siteUser} />}></Route>
            <Route path='/shoppingCart' element={<ShoppingCart />}></Route>
            <Route path='/productItemDetail/:id' element={<ItemDetail />}></Route>
            <Route path='/another' element={<h1>Another</h1>}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login exe={setSiteUser} />}></Route>
          </Routes>
          <Footer />
        </UserContext.Provider>
      </div>
    </PayPalScriptProvider>

  )
}
