
import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../../Services/CommonService/ProductService';
import VariationService from '../../../Services/CommonService/VariationService';

import EditIcon from '@mui/icons-material/Edit';

export default function ProductItem(props) {
    const navigate = useNavigate();

    const [productItem, setProductItem] = useState(props.productItem);
    const [product, setProduct] = useState({})

    const [price, setPrice] = useState(productItem.price);
    const [qtyInStock, setQtyInStock] = useState(productItem.qtyInStock);
    const [priceInputClass, setPriceInputClass] = useState('form-control price-lg close-price-input');
    const [priceSpanClass, setPriceSpanClass] = useState('form-control price-lg');
    const [modifyMode, setModifyCode] = useState(true);


    const qty = useRef(0);
    const pri = useRef(0);

    // Get list of products when input data changed.
    useEffect(()=>{
        setProductItem(props.productItem);
        ProductService.getProductByProductItemId(props.productItem.id).then((response)=>{
            setProduct(response.data);
        })
    },[props])

    // Increase or decrease when click on +/- button
    function changeQtyInStock(number){
        if(qtyInStock+number >= 0)
            setQtyInStock(qtyInStock + number);
        if(modifyMode)
            onModifyMode();
    }

    // Type number of products
    function typeQtyInStock(){
        let number = Number(qty.current.value);
        if(!isNaN(number)){
            qty.current.value = "";
            setQtyInStock(number);
        }
        if(modifyMode)
            onModifyMode();
    }
    // Cancel changed
    function cancel(){
        setQtyInStock(productItem.qtyInStock);
        setPrice(productItem.price);
        if(!modifyMode)
            offModifyMode();
    }
    // Save changed
    function save(){
        setProductItem(productItem =>{
            return {
                ...productItem,
                price: price,
                qtyInStock: qtyInStock
            }
        })
        ProductService.updateProductItem({...productItem, price: price, qtyInStock: qtyInStock});
        if(!modifyMode)
            offModifyMode();
    }
    // Delete a product
    function quickDelete(){
        ProductService.deleteProductItem(productItem.id);
    }

    // Show/hide input price 
    function changePriceInputClass(){
        if(priceInputClass.includes("close-price-input")){
            setPriceInputClass("form-control price-lg")
            setPriceSpanClass(priceInputClass + " close-price-input")
        }    
        else {
            setPriceInputClass(priceInputClass + " close-price-input")
            setPriceSpanClass("form-control price-lg");
        }
        if(modifyMode)
            onModifyMode();
            
    }

    // Focus intput price when click on the modify button
    useEffect(()=>{
        if(!priceInputClass.includes("close-price-input")){
            pri.current.focus();
        }
    }, [priceInputClass])

    // Change price of a product when type from the keyboard
    function changePrice(){
        let number = parseInt(pri.current.value);
        if(isNaN(number))
            setPrice(0);
        else {
            setPrice(number);
        }
    }

    function onModifyMode(){
        setModifyCode(false);
    }

    function offModifyMode(){
        setModifyCode(true);
    }

    const Config = (props) => {
        const [variationName, setVariationName] = useState("");
        useEffect(()=>{
            VariationService.getNameOfVariationByVariationOptionId(props.varOpId).then((response)=>{
                setVariationName(response.data);
            })
        }, [])
        return (
            <>
                <span> {props.value} </span>
            </>
        )
    }

    function goToDetail(){
        navigate("/administrator/products/productItemsDetail/"+productItem.id);
    }

    return (
        <div>
            <div className='product-list-info m-auto'>
                <div style={{textAlign: "center", background: "white"}}>
                    <img src={productItem.productImage} className="product-image" onClick={goToDetail}></img>
                </div>
                <div style={{minHeight: "150px"}} className="product-text">
                    <div className="product-name">{product.name} <span>{productItem.productConfigurations?.map((config, index)=><Config key={index} value={config.variationOption.value} varOpId={config.variationOption.id}></Config>)}</span></div>
                    <div className='quick-change'>
                        <div className='d-flex' style={{alignItems: "center"}}><input className={priceInputClass} ref={pri} onChange={changePrice} onMouseOut={changePriceInputClass} value={price}></input> <span className={priceSpanClass}>{Intl.NumberFormat('vi-VN', {style: "currency", currency: "VND"}).format(price)}</span> <button className='btn btn-light ms-2' style={{width: "41px", height: "37px", padding: "0px"}} onClick={changePriceInputClass}><EditIcon className="edit-button"/></button></div>
                        <div className='d-flex mt-1'>
                            <button className="btn btn-light" onClick={()=>changeQtyInStock(1)}>+</button>
                            <input type="number" min={0} ref={qty} className='form-control ms-1 me-1' onChange={typeQtyInStock} value={qtyInStock}></input>
                            <button className='btn btn-light' onClick={()=>changeQtyInStock(-1)}>-</button>
                        </div>
                    </div>
                </div>
                <div className='d-flex'>
                    <button className='btn btn-danger flex-grow-1 m-1 ms-0' onClick={quickDelete}>Delete</button>
                    <button className='btn btn-dark border border-danger flex-grow-1 m-1' onClick={save} disabled={modifyMode}>Save</button>
                    <button className='btn btn-dark border border-danger flex-grow-1 m-1 me-0' onClick={cancel} disabled={modifyMode}>Cancel</button>
                </div>
                
            </div>
        </div>
    )
}