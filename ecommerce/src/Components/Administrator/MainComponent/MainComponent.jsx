import React from 'react'
import {Routes, Route} from "react-router-dom"
import AddProductComponent from '../AddProductComponent/AddProductComponent';
import ProductsComponent from '../ProductComponent/ProductsComponent'
import ProductItemsDetail from '../ProductItemsComponent/ProductItemsDetail';

import "./Style.css"

export default function MainComponent() {
  return (
    <div className='main'>
        <Routes>
            <Route path='/products' element={<ProductsComponent/>}></Route>
            <Route path='/addProduct' element={<AddProductComponent/>}></Route>
            <Route path='/products/productItemsDetail/:id' element={<ProductItemsDetail/>}></Route>
        </Routes>
    </div>
  )
}
