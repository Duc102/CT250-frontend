import React from 'react'
import { useState, useEffect, useRef } from 'react'
import ContentEditable from 'react-contenteditable';

import Category from '../ProductComponent/Category';
import Variation from '../ProductComponent/Variation';
import ProductCategoryService from '../../../Services/CommonService/ProductCategoryService';
import ProductImage from '../ProductItemsComponent/ProductImage';
import Editor from '../ProductItemsComponent/Editor';
import ProductService from '../../../Services/CommonService/ProductService';

import EditIcon from '@mui/icons-material/Edit';
import UploadFileService from '../../../Services/CommonService/UploadFileService';
import VariationService from '../../../Services/CommonService/VariationService';
import { findVariationOptionFromVariations } from "../ProductItemsComponent/Execute"
export default function AddProductComponent() {
    const [zeroCategory, setZeroCategory] = useState([]);
    const [category, setCategory] = useState(0);
    const [variationOfCategory, setVariationOfCategory] = useState([]);
    const [product, setProduct] = useState({ id: 0, name: "New Product Name" });
    const [numberProIt, setNumberProIt] = useState(1);
    const fakeProId = useRef(0);
    const [productItems, setProductItems] = useState(() => {
        let list = [];
        for (let i = 0; i < numberProIt; i++) {
            list.push({
                id: fakeProId.current,
                price: 0,
                sku: "KSU0000001",
                qtyInStock: 0,
                conditions: {},
                productConfigurations: [],
                existedImages: [],
                newImages: []
            });
            fakeProId.current = fakeProId.current + 1;
        }
        return list;
    });


    const [description, setDescription] = useState();
    const [reset, setReset] = useState(0);


    const [priceInputClass, setPriceInputClass] = useState('form-control price-lg-detail close-price-input');
    const [priceSpanClass, setPriceSpanClass] = useState('form-control price-lg-detail');

    useEffect(() => {
        ProductCategoryService.getProductCategoryZeroLevel().then((response) => {
            if (response.data.length > 0) {
                let data = [{ id: 0, categoryName: "All" }];
                response.data.forEach(element => {
                    data.push(element);
                });
                setZeroCategory(data);
            }
        });
    }, []);

    useEffect(() => {
        if (category)
            VariationService.getVariationAlongCategoryId(category).then((response) => {
                let tmpVar = response.data;
                setVariationOfCategory(tmpVar);
            })
    }, [category])

    function setPrice(id) {
        let number = parseInt(document.getElementById("new-product-price-" + id).value);
        if (isNaN(number)) {
        }
        else {
            let list = productItems;
            let result = list.filter((proIt) => proIt.id === id);
            result = result[0];
            let index = list.indexOf(result);
            result.price = number;
            list[index] = result;
            setProductItems([...list]);
        }
    }


    function setKSU(id) {
        let sku = document.getElementById("new-product-ksu-" + id).value;
        let list = productItems;
        let result = list.filter((proIt) => proIt.id === id);
        result = result[0];
        let index = list.indexOf(result);
        result.sku = sku;
        list[index] = result;
        setProductItems([...list]);
    }

    function setQtyInStock(id, number) {
        let list = productItems;
        let result = list.filter((proIt) => proIt.id === id);
        result = result[0];
        let index = list.indexOf(result);
        let pre = result.qtyInStock + number;
        if (pre >= 0)
            result.qtyInStock = pre;
        else
            result.qtyInStock = 0;
        list[index] = result;
        setProductItems([...list]);
    }

    // Type number of products
    function typeQtyInStock(id) {
        let number = Number(document.getElementById("new-product-qty-" + id).value);
        if (!isNaN(number)) {
            let list = productItems;
            let result = list.filter((proIt) => proIt.id === id);
            result = result[0];
            let index = list.indexOf(result);
            result.qtyInStock = number;
            list[index] = result;
            setProductItems([...list]);
        }
    }

    function setProductName(event) {
        setProduct({ ...product, name: event.target.value });
    }

    function onModifyMode() {

    }

    function offModifyMode() {

    }

    function addNewProductItem() {
        setNumberProIt(numberProIt + 1);
        setProductItems(processAddProIt());
        // fakeProId.current = fakeProId.current + 1;
    }
    function processAddProIt() {
        let proItId = fakeProId.current;
        fakeProId.current += 1;
        return [...productItems, {
            id: proItId,
            price: 0,
            sku: "KSU0000001",
            qtyInStock: 0,
            conditions: {},
            productConfigurations: [],
            existedImages: [],
            newImages: []
        }]
    }

    function setConfiguration(id, conditions) {
        let list = productItems;
        let result = list.filter((proIt) => proIt.id === id);
        result = result[0];
        let index = list.indexOf(result);
        console.log(conditions);
        result.conditions = conditions;
        list[index] = result;
        setProductItems([...list]);
    }

    function preprocessConfig(conditions) {
        let newConfig = [];
        // Keys are id of variation of the product item
        let keys = Object.keys(conditions);
        keys.forEach(key => {
            // Value of key is id of variation option
            let varOp = conditions[key];
            // Get object variation option from the variation option id.
            let vo = findVariationOptionFromVariations(varOp, variationOfCategory.filter(i => Number(i.id) === Number(key)).at(0));
            // Formate config form variation option.
            let objvo = {};
            objvo["id"] = "0";
            objvo["variationOption"] = vo;
            newConfig.push(objvo);
        });
        return newConfig;
    }

    function preprocessDescription(productId){
        if (description) {
            let ops = description.ops;
            ops.forEach(op => {
                if(op.insert?.image){
                    let url = op.insert.image;
                    url = url.replaceAll("/0/", "/"+productId+"/");
                    console.log("This is url",url);
                    op.insert.image = url;
                }
            })
        }
    }

    function setNewImages(id, newImages) {
        let list = productItems;
        let result = list.filter((proIt) => proIt.id === id);
        result = result[0];
        let index = list.indexOf(result);
        result.newImages = [...newImages];
        list[index] = result;
        setProductItems([...list]);
    }

    function setExistedImages(id, existedImages) {
        let list = productItems;
        let result = list.filter((proIt) => proIt.id === id);
        result = result[0];
        let index = list.indexOf(result);
        result.existedImages = [...existedImages];
        list[index] = result;
        setProductItems([...list]);
    }

    /**
     * Update storage location for images of a product item after save the product item in database.
     * Example: /Products/100/1000
     * @param {*} product  Product object
     * @param {Array} productItems  Product items list
     */
    function preprocessUpdate(product, productItems, createdProductItems) {

        for (let i = 0; i < productItems.length; i++) {
            productItems[i].newImages.forEach(image => {
                let location = image.storageLocation;
                let split = location.split("/");
                split.splice(0, 1);
                split[split.length - 1] = createdProductItems[i].id;
                split[split.length - 2] = product.id;
                location = "";
                split.forEach(l => {
                    location = location.concat("/", l);
                })
                image.storageLocation = location;
                let img = {};
                img["id"] = 0;
                img["url"] = "/Images" + location + "/" + image.name.replaceAll(" ", "") + "." + image.extension;
                UploadFileService.uploadFile(image.name, image.storageLocation, image.src);
                productItems[i].existedImages.push(img);
            })
            let config = preprocessConfig(productItems[i].conditions);
            productItems[i].productConfigurations = config;
        }
        return productItems;
    }


    function save() {
        let newProduct = {
            ...product,
            productCategory: {
                id: category
            }
        }
        ProductService.createProduct(newProduct).then((response) => {
            let createdProduct = response.data;
            preprocessDescription(createdProduct.id);
            UploadFileService.uploadJsonFile("description.json","/Products/Descriptions/"+createdProduct.id,description).then(response => {
                console.log("This is description: ",response.data);
            });
            ProductService.createProductItem(createdProduct.id, productItems).then(response => {
                let createdProductItems = response.data;
                let preProIts = preprocessUpdate(createdProduct, productItems, createdProductItems);
                for (let i = 0; i < preProIts.length; i++) {
                    createdProductItems[i].productImages = preProIts[i].existedImages;
                    createdProductItems[i].productConfigurations = preProIts[i].productConfigurations;
                }
                ProductService.updateProductImagesNewProductItem(createdProductItems).then(response => {
                    console.log("Full image", response.data);
                })
            })
        });
    }
    return (
        <div>
            <ContentEditable html={product?.name} tagName='h2' onChange={setProductName}></ContentEditable>
            <Category title="Category" data={zeroCategory} parent={0} setCategoryId={setCategory}></Category>
            <button onClick={addNewProductItem}>New Product Item</button>
            {
                productItems.map((proIt, index) => {
                    return (
                        <div key={index}>
                            <Variation goal={"new-product-" + proIt.id + "-variations"} categoryId={category} setConditions={(configuration) => setConfiguration(proIt.id, configuration)}></Variation>
                            <div className="product-modify">
                                <div className='d-flex' style={{ alignItems: "center" }}>
                                    <span>Price</span>
                                    <input id={"new-product-price-" + proIt.id} type="number" onChange={() => setPrice(proIt.id)}></input>
                                    {/* <span className={priceSpanClass}>{Intl.NumberFormat('vi-VN', { style: "currency", currency: "VND" }).format(proIt.price)}</span> */}
                                </div>
                                <div className='ksu'>
                                    <span>SKU</span>
                                    <input id={"new-product-ksu-" + proIt.id} onChange={() => setKSU(proIt.id)}></input>
                                </div>
                                <div className='d-flex mt-1 justify-content-center'>
                                    <button className="btn btn-light qty" style={{ margin: "3px", width: "40px" }} onClick={() => setQtyInStock(proIt.id, 1)}>+</button>
                                    <div className='qty-input'>
                                        <input id={"new-product-qty-" + proIt.id} type="number" min={0} value={proIt.qtyInStock} className='form-control' onChange={() => typeQtyInStock(proIt.id)}></input>
                                    </div>
                                    <button className='btn btn-light qty' style={{ margin: "3px", width: "40px" }} onClick={() => setQtyInStock(proIt.id, -1)}>-</button>
                                </div>
                            </div>
                            <div className='product-image'>
                                <ProductImage product={product} productItem={proIt} imagesList={proIt.existedImages} setImagesList={(existedImages) => setExistedImages(proIt.id, existedImages)} newImages={proIt.newImages} setNewImages={(newImages) => setNewImages(proIt.id, newImages)} onModify={onModifyMode} offModifyMode={offModifyMode} />
                            </div>

                        </div>
                    )
                })
            }
            <div className='description'>
                <Editor product={product} setDescription={setDescription} reset={reset} onModifyMode={onModifyMode} offModifyMode={offModifyMode} />
            </div>
            <button onClick={save}>Save</button>
        </div>
    )
}
