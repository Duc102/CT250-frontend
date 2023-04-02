import React from 'react';
import { useState, useEffect, useContext } from 'react';
import ProductService from '../../../Services/CommonService/ProductService';
import ShoppingCartService from '../../../Services/CommonService/ShoppingCartService';
import UserContext from '../UserContext'
import { useNavigate } from 'react-router-dom';
import VariationService from '../../../Services/CommonService/VariationService';

const ProductItem = (props) => {
    const [product, setProduct] = useState();
    const context = useContext(UserContext);
    const shoppingCart = context.shoppingCart;
    const setShoppingCart = context.setShoppingCart;

    useEffect(() => {
        ProductService.getProductByProductItemId(props.productItem.id).then(response => {
            setProduct(response.data);
        })
    }, [])

    const navigate = useNavigate();
    const [priceSpanClass, setPriceSpanClass] = useState('form-control price-lg');



    const Config = (props) => {
        const [variationName, setVariationName] = useState("");
        useEffect(() => {
            VariationService.getNameOfVariationByVariationOptionId(props.varOpId).then((response) => {
                setVariationName(response.data);
            })
        }, [])
        return (
            <>
                <span> {props.value} </span>
            </>
        )
    }

    function goToDetail() {
        navigate("/productItemDetail/" + props.productItem.id);
    }

    function buy(){
        addShoppingCart();
        navigate("/shoppingCart")
    }

    function addShoppingCart(){
        let shoppingCartItem = {
            id: {
              shoppingCartId: shoppingCart.id,
              productItemId: props.productItem.id
            },
            productItem: props.productItem,
            qty: 1
          }
        let ss = shoppingCart.shoppingCartItems.filter(it => it.id.productItemId === props.productItem.id);
        if(ss.length > 0){
            ss[0].qty += 1;
            ShoppingCartService.addShoppingCartItem(shoppingCartItem).then(response=>{
                setShoppingCart({...shoppingCart, shoppingCartItems: [...shoppingCart.shoppingCartItems]})
            })
        } else
            ShoppingCartService.addShoppingCartItem(shoppingCartItem).then(response=>{
                setShoppingCart({...shoppingCart, shoppingCartItems: [...shoppingCart.shoppingCartItems, shoppingCartItem]})
            })
    }

    if (product)
        return (
            <div style={{minWidth: "300px",}}>
                <div className='product-list-info mt-1 mb-1' style={{marginLeft: "auto", marginRight: "auto"}}>
                    <div style={{ textAlign: "center", background: "white" }}>
                        <img src={props.productItem.productImages[0].url} alt="Product Image" className="product-image" onClick={goToDetail}></img>
                    </div>
                    <div style={{ minHeight: "150px" }} className="product-text">
                        <div className="product-name">{product.name} <span>{props.productItem.productConfigurations?.map((config, index) => <Config key={index} value={config.variationOption.value} varOpId={config.variationOption.id}></Config>)}</span></div>
                        <div className='text-muted fst-italic'>Available: {props.productItem.qtyInStock}</div>
                        <div className='quick-change'>
                            <div className='d-flex' style={{ alignItems: "center" }}> <span className={priceSpanClass}>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(props.productItem.price)}</span></div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <button className='btn btn-dark border border-danger flex-grow-1 m-1' onClick={addShoppingCart}>Add Cart</button>
                        <button className='btn btn-success border border-success flex-grow-1 m-1 me-0 ' onClick={buy}>Buy</button>
                    </div>

                </div>
            </div>
        );
    else return (<></>)
}

export default ProductItem;
