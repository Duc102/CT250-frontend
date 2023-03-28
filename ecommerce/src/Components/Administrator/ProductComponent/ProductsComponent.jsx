
import React from 'react'
import { useState, useEffect } from 'react';

import Category from './Category';
import "./Style.css"

import ProductCategoryService from '../../../Services/CommonService/ProductCategoryService';
import Variation from './Variation';
import ProductListRow from './ProductListRow';
import AlertNote from "../Notification/AlertNote"
import ConfirmDialog from '../Notification/ConfirmDialog';

import InventoryIcon from '@mui/icons-material/Inventory';

export default function ProductsComponent(props) {

    const [data, setData] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [conditions, setConditions] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: "info" });
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle:"", commit: ()=>{}});

    useEffect(() => {
        ProductCategoryService.getProductCategoryZeroLevel().then((response) => {
            if (response.data.length > 0) {
                let data = [{ id: 0, categoryName: "All" }];
                response.data.forEach(element => {
                    data.push(element);
                });
                setData(data);
            }
        });
        props.setActbar("Products");
    }, []);

    return (
        <div className='product-contain main-content'>
            <header>
            <div>
                <h2 className="title-page"><span><InventoryIcon className='icon' />Products</span></h2>
            </div>
                <div className='category d-flex flex-wrap'>
                    <Category goal="filter" title="Category" data={data} parent={0} setCategoryId={setCategoryId}></Category>
                </div>
                <Variation goal="get-variations" categoryId={categoryId} setConditions={setConditions}></Variation>
            </header>
            <ProductListRow value={categoryId} conditions={conditions} setNotify={setNotify} setConfirmDialog={setConfirmDialog}></ProductListRow>
            <AlertNote notify = {notify} setNotify = {setNotify}/>
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}></ConfirmDialog>
        </div>
    )
}
