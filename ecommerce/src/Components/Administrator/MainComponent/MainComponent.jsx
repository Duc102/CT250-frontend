import React from 'react'
import {Routes, Route} from "react-router-dom"
import AddProductComponent from '../AddProductComponent/AddProductComponent';
import Dashboard from '../DashboardComponent/Dashboard';
import ProductsComponent from '../ProductComponent/ProductsComponent'
import ProductItemsDetail from '../ProductItemsComponent/ProductItemsDetail';
import ShopOrder from '../ShopOrderComponent/ShopOrder';
import ShopOrderDetail from '../ShopOrderComponent/ShopOrderDetail';

import "./Style.css"

export default function MainComponent() {
  return (
    <div className='main'>
        <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/products' element={<ProductsComponent/>}></Route>
            <Route path='/products/productItemsDetail/:id' element={<ProductItemsDetail/>}></Route>
            <Route path='/addProduct' element={<AddProductComponent/>}></Route>
            <Route path='/orders' element={<ShopOrder/>}></Route>
            <Route path="/orders/:id/detail" element={<ShopOrderDetail/>}></Route>
        </Routes>
    </div>
  )
}
