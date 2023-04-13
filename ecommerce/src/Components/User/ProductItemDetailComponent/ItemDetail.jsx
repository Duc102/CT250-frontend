import React from 'react';
import { Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext'
import 'react-quill/dist/quill.snow.css';

import ProductService from '../../../Services/CommonService/ProductService';
import VariationService from '../../../Services/CommonService/VariationService';
import ShoppingCartService from '../../../Services/CommonService/ShoppingCartService';

import { findVariationOptionFromVariations } from '../../Administrator/Execute';
import ProductImage from './ProductImage';
import OtherProductItem from './OtherProductItem';
import Description from './Description';
import "./ItemDetail.css"

const ItemDetail = () => {
    const { id } = useParams();
    const [categoryId, setCategoryId] = useState(0);
    const [variationOfCategory, setVariationOfCategory] = useState([]);
    const [product, setProduct] = useState({});
    const [productItem, setProductItem] = useState({});
    const [qty, setQty] = useState(1);

    const [otherProductItems, setOtherProductItems] = useState([]);
    const [otherConfig, setOtherConfig] = useState({});
    const [otherVariations, setOtherVariations] = useState([]);
    const [selectedOtherVarOp, setSelectedOtherVariation] = useState({}); // => for other product items
    const [conditions, setConditions] = useState([]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "info" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "", commit: () => { } });

    const context = useContext(UserContext);
    const shoppingCart = context.shoppingCart;
    const setShoppingCart = context.setShoppingCart;

    function buy() {
        addShoppingCart();
        navigate("/shoppingCart")
    }

    function addShoppingCart() {
        let shoppingCartItem = {
            id: {
                shoppingCartId: shoppingCart.id,
                productItemId: productItem.id
            },
            productItem: productItem,
            qty: qty
        }
        let ss = shoppingCart.shoppingCartItems.filter(it => it.id.productItemId === productItem.id);
        if (ss.length > 0) {
            ss[0].qty += qty;
            ShoppingCartService.addShoppingCartItem(shoppingCartItem).then(response => {
                setShoppingCart({ ...shoppingCart, shoppingCartItems: [...shoppingCart.shoppingCartItems] })
            })
        } else
            if (productItem.qtyInStock !== 0) {
                ShoppingCartService.addShoppingCartItem(shoppingCartItem).then(response => {
                    setShoppingCart({ ...shoppingCart, shoppingCartItems: [...shoppingCart.shoppingCartItems, shoppingCartItem] })
                })
            }
    }

    const navigate = useNavigate();

    useEffect(() => {
        let product, productItem;
        // Get product item detail
        ProductService.getProductItemsDetail(id).then((response) => {
            productItem = response.data;
            console.log(productItem);
            setProductItem(productItem);
            setOtherProductItems([productItem]);

            // Get current configuration of a product item
            let proConfig = productItem.productConfigurations;
            // proConfig = [
            //   {
            //     id: 21,
            //     variationOption: {
            //       id: 48,
            //       value: "16GB"
            //     }
            //   },
            //   ...
            // ]

            // short cut {variation: variation option} by id of them.
            let VAO = {}
            let initConditions = [];
            proConfig.forEach(c => {
                let varOpId = c.variationOption.id;
                initConditions.push(varOpId);
                VariationService.getVariationByVariationOptionId(varOpId).then(respone => {
                    let vari = respone.data;
                    // vari= {
                    //   id: 3,
                    //   name: "Capacity",
                    //   ...
                    // }
                    let varId = vari.id;
                    VAO[varId] = varOpId;

                    // VAO = {
                    //   3 (=>variation id): 48 (=>variation option id),
                    //   ...
                    // }
                })
            })
            // set current variation selected
            setSelectedOtherVariation(VAO);
            setConditions(initConditions);
        })

        // Get other product item of the same product but differ the configuration
        ProductService.getProductByProductItemId(id).then(res => {
            product = res.data;
            setProduct(product);
            setCategoryId(product.productCategory.id);
            VariationService.getVariationAlongCategoryId(product.productCategory.id).then((response) => {
                let tmpVar = response.data;
                setVariationOfCategory(tmpVar);
            })

            // UploadFileService.readProductDescriptionsFile(product.id).then(response => {
            //     setDescription(response.data);
            // });
            // Get other configuration of the product. 
            ProductService.getOtherConfigurationsOfProduct(product.id, []).then(r => {
                setOtherConfig(r.data);
                // format: variationid: [{variation option}, ...]
                // otherConfig = [
                //   3: [{id: 48, value: "16GB"}, ...]
                //   4: [{id: 49, value: "32GB"}, ...]
                // ]
                let vars = Object.keys(r.data);
                setOtherVariations(vars); //variation type
            })
        });
    }, [id])

    function selectAnotherProductItem() {
        let exeConditions = [];
        let VAO = {}
        otherVariations.forEach((variation) => {
            let varSel = document.getElementById(variation);
            if (parseInt(varSel.value) !== 0) {
                exeConditions.push(parseInt(varSel.value));
            }
            VAO[variation] = varSel.value;
        })
        setSelectedOtherVariation(VAO);
        setConditions(exeConditions);
        ProductService.getProductItemsByProductIdAndConfiguration(product.id, exeConditions).then(response => {
            setOtherProductItems(response.data);
        })
    }

    const Config = (props) => {
        return (
            <>
                {
                    props.config?.map((config, index) => <span key={index}> {config.variationOption.value}</span>)
                }
            </>
        )
    }

    function changeQty(number) {
        let n = qty + number;
        if (n > productItem.qtyInStock)
            setQty(productItem.qtyInStock);
        else if (n >= 1)
            setQty(n);
        else setQty(1);
    }

    return (
        <Container className='border border-dark rounded p-1 mt-1 mb-1'>
            <div className='main-content'>
                <div className='model-name-container'>
                    <h1 className='product-name-detail'>
                        {product.name}
                        <Config config={productItem.productConfigurations} /></h1>
                </div>
                <div>
                    <div className='product-image'>
                        <ProductImage product={product} productItem={productItem} />
                    </div>
                    <div>
                        <div className='d-flex' style={{ alignItems: "center" }}>
                            <span className='price-lg-detail'>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(productItem.price)}</span>
                        </div>

                        <div className='d-flex'>
                            <div>
                                <OtherProductItem other={otherConfig} selected={selectedOtherVarOp} fun={selectAnotherProductItem} productItems={otherProductItems} productId={product.id} />
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <div className='d-flex justify-content-center'>
                                    <button className="btn btn-light qty" style={{ margin: "3px", width: "40px" }} onClick={() => changeQty(1)}>+</button>
                                    <div className='qty-input'>
                                        <span className='btn btn-light'>{qty}</span>
                                    </div>
                                    <button className='btn btn-light qty' style={{ margin: "3px", width: "40px" }} onClick={() => changeQty(-1)}>-</button>
                                </div>
                                <div className='text-muted fst-italic'>Available: {productItem.qtyInStock}</div>
                                <div className='d-flex'>
                                    <button className='btn btn-dark border border-danger flex-grow-1 m-1 ms-0' onClick={addShoppingCart}>Add Cart</button>
                                    <button className='btn btn-success border border-success flex-grow-1 m-1' onClick={buy}>Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Description product={product}></Description>
            </div>
        </Container>
    );
}

export default ItemDetail;
