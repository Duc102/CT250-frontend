import React from "react";
import {useState, useEffect} from 'react'

import ProductService from "../../../Services/CommonService/ProductService";
import ProductItem from "./ProductItem";

const ProductListRow = (props) => {
    const [products, setProducts] = useState([]);
    const [haveChange, setHaveChange] = useState(0);
    useEffect(()=>{
        let productList = [];
        let categoryId = parseInt(props.value);
        if(categoryId !== 0 && props.conditions.length === 0){
            ProductService.getProductItemByCategoryId(categoryId).then((response)=>{
                productList = response.data;
                setProducts(productList);
            })
        }
        else if (categoryId !== 0 && props.conditions.length !== 0){
            ProductService.getProductItemByCategoryWithConfiguration(categoryId, props.conditions).then((response)=>{
                productList = response.data;
                setProducts(productList);
            })
        } else {
            ProductService.getAllProductItems().then((response)=>{
                productList = response.data;
                setProducts(productList);
            })
        }
    },[props, haveChange])
    return (
        <div className="row justify-content-center">
        {
            products.length > 0 ?
            products.map((product, index)=>{
                return (
                <div key={index} className="col-sm-6 col-lg-4 p-1" style={{minWidth: "310px"}}>
                    <ProductItem productItem={product} refresh={setHaveChange}></ProductItem>
                </div>
                )
            })
            :<></>
        }
        </div>
    )
}
export default ProductListRow;
