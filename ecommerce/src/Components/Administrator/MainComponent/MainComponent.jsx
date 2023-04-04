import React ,{useState} from 'react'
import {Routes, Route} from "react-router-dom"
import AddProductComponent from '../AddProductComponent/AddProductComponent';
import AddProductItem from '../AddProductComponent/AddProductItem';
import Dashboard from '../DashboardComponent/Dashboard';
import ProductsComponent from '../ProductComponent/ProductsComponent'
import ProductItemsDetail from '../ProductItemsComponent/ProductItemsDetail';
import ShopOrder from '../ShopOrderComponent/ShopOrder';
import ShopOrderDetail from '../ShopOrderComponent/ShopOrderDetail';

import "./Style.css"
import AllUsers from '../UsersComponent/AllUsers';
import SiteUserDetail from '../UsersComponent/SiteUserDetail';

export default function MainComponent(props) {
  
  return (
    <div className={props.mainClass}>
        <Routes>
            <Route path='/' element={<Dashboard setActbar={props.setActbar}/>}></Route>
            <Route path='/products' element={<ProductsComponent setActbar={props.setActbar}/>}></Route>
            <Route path='/products/productItemsDetail/:id' element={<ProductItemsDetail setActbar={props.setActbar}/>}></Route>
            <Route path='/addProduct' element={<AddProductComponent setActbar={props.setActbar}/>}></Route>
            <Route path='/addProductItem/:productId' element={<AddProductItem setActbar={props.setActbar}/>}></Route>
            <Route path='/orders' element={<ShopOrder setActbar={props.setActbar}/>}></Route>
            <Route path="/orders/:id/detail" element={<ShopOrderDetail setActbar={props.setActbar}/>}></Route>
            <Route path='/users' element={<AllUsers setActbar={props.setActbar}/>}></Route>
            <Route path='/users/:id/detail' element={<SiteUserDetail setActbar={props.setActbar}/>}></Route>
        </Routes>
    </div>
  )
}
