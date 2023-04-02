import React from 'react'
import { useEffect, useState, useContext } from 'react'
import HeaderContent from '../HeaderContentComponent/HeaderContent'
import ProductServices from "../../../Services/CommonService/ProductService"
import "./LazyStyle.css"
import ProductItem from './ProductItem'



export default function LazyComponent(props) {
    
    const [productItems, setProductItems] = useState();

    useEffect(()=>{
        if(props.category){
            ProductServices.getProductItemByCategoryId(props.category).then(response=>{
                setProductItems(response.data);
            })
        } else if(props.productItems){
            setProductItems([...props.productItems]);
        }
    },[props])
    
  return (
    <div className='w-100 mt-1' style={{minHeight: "120px"}}>
        <HeaderContent title={props.title}></HeaderContent>
        <div className='lazy-container'>
            {
                productItems?
                productItems.map((productItem, index)=> <ProductItem key={index} productItem={productItem}/>)
                :<></>
            }
        </div>
    </div>
  )
}
