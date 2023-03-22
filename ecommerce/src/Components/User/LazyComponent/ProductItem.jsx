import React from 'react';
import { useState, useEffect, useContext } from 'react';
import ProductService from '../../../Services/CommonService/ProductService';
import ShoppingCartService from '../../../Services/CommonService/ShoppingCartService';
import UserContext from '../UserContext'

const ProductItem = (props) => {
    const [product, setProduct] = useState();
    const context = useContext(UserContext);
    const shoppingCart = context.shoppingCart;
    const setShoppingCart = context.setShoppingCart;
    
    const itemStyle = {
        maxWidth: "200px",
        minHeight: "300px"
    }

    useEffect(() => {
        ProductService.getProductByProductItemId(props.productItem.id).then(response => {
            setProduct(response.data);
        })
    }, [])

    function addShoppingCart(){
        let shoppingCartItem = {
            id: {
              shoppingCartId: shoppingCart.id,
              productItemId: props.productItem.id
            },
            productItem: props.productItem,
            qty: 1
          }
        ShoppingCartService.addShoppingCartItem(shoppingCartItem).then(response=>{
            setShoppingCart({...shoppingCart, shoppingCartItems: [...shoppingCart.shoppingCartItems, shoppingCartItem]})
        })
    }
    if (product)
        return (
            <div className='col bg-white m-1' style={itemStyle}>
                <img src={props.productItem.productImages[0].url} width="100px"></img>
                <div>{product.name}</div>
                <div>{props.productItem.price}</div>
                <button onClick={addShoppingCart}>Add Cart</button>
                <button>Buy</button>
            </div>
        );
    else return(<></>)
}

export default ProductItem;
