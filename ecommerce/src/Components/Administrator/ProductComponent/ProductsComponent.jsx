
import React from 'react'
import { useState, useEffect} from 'react';

import Category from './Category';
import "./Style.css"

import ProductCategoryService from '../../../Services/CommonService/ProductCategoryService';
import Variation from './Variation';
import ProductListRow from './ProductListRow';
export default function ProductsComponent() { 

    const [data, setData] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [conditions, setConditions] = useState([]);
    useEffect(()=>{
        ProductCategoryService.getProductCategoryZeroLevel().then((response) => {
            if (response.data.length > 0) {
                let data = [{id: 0, categoryName: "All"}];
                response.data.forEach(element => {
                    data.push(element);
                });
                setData(data);
            }
        });
        
    }, []);

    return (
        <div className='product-contain'>
            <header>
                <div className='category d-flex flex-wrap'>
                    <Category goal="filter" title="Category" data={data} parent={0} setCategoryId={setCategoryId}></Category>
                </div>
                <Variation goal="get-variations" categoryId={categoryId} setConditions={setConditions}></Variation>
            </header>
            <ProductListRow value={categoryId} conditions={conditions}></ProductListRow> 
        </div>
    )
}
