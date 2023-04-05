import React from 'react';
import {useEffect, useState, useContext} from 'react';
import ShoppingCartService from '../../../Services/CommonService/ShoppingCartService';
import ProductService from "../../../Services/CommonService/ProductService"
import {executeFullNamForProductItem} from "../../Administrator/Execute"
import UserContext from '../UserContext';
import { DeleteRounded } from '@mui/icons-material';

const ProductItemLine = (props) => {
    
    const [update, setUpdate] = useState(false);
    const context = useContext(UserContext);
    const setShoppingCart = context.setShoppingCart;
    const shoppingCart = context.shoppingCart;
    const [product, setProduct] = useState({name: "Product Name"});

    useEffect(()=>{
        ProductService.getProductByProductItemId(props.productLine.productItem.id).then(res=>{
            setProduct(res.data);
        });
    },[])
    
    function calSum(){
       return props.productLine.productItem.price * props.productLine.qty
    }

    function changeQty(number){
        props.productLine.qty += number;
        if(props.productLine.qty<0)
            props.productLine.qty = 0;
        setUpdate(!update);
        let shoppingCartItem = {
            id: {
              shoppingCartId: props.cartId,
              productItemId: props.productLine.productItem.id
            },
            qty: props.productLine.qty
          }
        ShoppingCartService.updateShoppingCartItem(shoppingCartItem).then(response=>{
            console.log("Update Result",response.data);
        })
    }

    function deleteProductItems(){
        let shoppingCartItem = {
            id: {
              shoppingCartId: props.cartId,
              productItemId: props.productLine.productItem.id
            },
          }
        ShoppingCartService.deleteShoppingCartItem(shoppingCartItem).then(response=>{
            console.log("Delete Result",response.data);
        })

        let del = shoppingCart.shoppingCartItems.filter(pro => pro.productItem.id === props.productLine.productItem.id);
        let list = shoppingCart.shoppingCartItems;
        let index = list.indexOf(del[0]);
        if(index != -1){
            list.splice(index, 1);
            setShoppingCart({...shoppingCart, shoppingCartItems: [...list]});
        } 
    }


    return (
        <tr>
            <td className='text-center'>{props.no+1}</td>
            <td className='text-center'>
                <img src={props.productLine.productItem.productImages[0].url} width="100px"></img>
            </td>
            <td className='text-center' style={{whiteSpace: "normal", maxWidth: "225px"}}>{executeFullNamForProductItem(product, props.productLine.productItem)}</td>
            <td className='text-center price-color'>
            {Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(props.productLine.productItem.price)}
            </td>
            <td className='text-center' style={{whiteSpace: "nowrap"}}>
                <button className='btn btn-light ms-1' onClick={()=>changeQty(1)}>+</button>
                <span  className='btn btn-light ms-1 me-1'>
                    {props.productLine.qty}
                </span>
                <button className='btn btn-light me-1' onClick={()=>changeQty(-1)}>-</button>
            </td>
            <td className='text-center price-color'>
                {Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(calSum())}
            </td>
            <td>
                <button className='btn btn-danger' onClick={deleteProductItems}><DeleteRounded></DeleteRounded></button>
            </td>
        </tr>
    );
}

export default ProductItemLine;
