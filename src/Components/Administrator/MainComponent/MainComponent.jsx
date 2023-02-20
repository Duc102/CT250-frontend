import React from 'react'
import {Routes, Route} from "react-router-dom"
import ProductsComponent from '../ProductComponent/ProductsComponent'

import "./Style.css"
export default function MainComponent() {
  return (
    <div className='main'>
        <Routes>
            <Route path='/products' element={<ProductsComponent/>}></Route>
        </Routes>
    </div>
  )
}
