import React from 'react'
import { useState, useEffect, useRef } from 'react'
import ContentEditable from 'react-contenteditable';
import { useNavigate, useParams } from 'react-router-dom';

import Category from '../ProductComponent/Category';
import Variation from '../ProductComponent/Variation';
import ProductCategoryService from '../../../Services/CommonService/ProductCategoryService';
import ProductImage from '../ProductItemsComponent/ProductImage';
import Editor from '../ProductItemsComponent/Editor';
import ProductService from '../../../Services/CommonService/ProductService';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategoryIcon from '@mui/icons-material/Category';
import { Delete } from '@mui/icons-material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ProductsIcon from '@mui/icons-material/Inventory';
import UploadFileService from '../../../Services/CommonService/UploadFileService';
import VariationService from '../../../Services/CommonService/VariationService';
import { findVariationOptionFromVariations } from "../ProductItemsComponent/Execute"

import "./AddProductComponent.css"

export default function AddProductItem(props) {
    const { productId } = useParams();
    const [zeroCategory, setZeroCategory] = useState([]);
    const [category, setCategory] = useState(0);
    const [treeCategory, setTreeCategory] = useState();
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
                sku: "KSU000"+ fakeProId.current + "" + i,
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



    const [description, setDescription] = useState({ops:[{insert: "\n"}]});
    const [reset, setReset] = useState(0);

    function refresh() {
        setVariationOfCategory([]);
        setNumberProIt(1);
        setDescription({ops:[{insert: "\n"}]});
        fakeProId.current = 0;
        setProductItems(() => {
            let list = [];
            for (let i = 0; i < 1; i++) {
                list.push({
                    id: 0,
                    price: 0,
                    sku: "KSU00000",
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
    }

    useEffect(() => {
        ProductCategoryService.getProductCategoryZeroLevel().then((response) => {
            if (response.data.length > 0) {
                let data = [{ id: 0, categoryName: "No" }];
                response.data.forEach(element => {
                    data.push(element);
                });
                setZeroCategory(data);
            }
        });
    }, [reset]);



    useEffect(() => {
        if (category)
            VariationService.getVariationAlongCategoryId(category).then((response) => {
                let tmpVar = response.data;
                setVariationOfCategory(tmpVar);
            })
    }, [category])

    function openStree(input, output) {
        output.push(input.id);
        if (input.parentCategory != null) {
            openStree(input.parentCategory, output);
        }
    }

    useEffect(() => {
        props.setActbar("AddProduct");
        ProductService.getProductById(productId).then(response => {
            let product = response.data;
            setProduct(product);
            setCategory(product.productCategory.id);
            let output = [];
            openStree(product.productCategory, output);
            setTreeCategory(output);
        })
    }, [])

    function setPrice(id) {
        let number = parseFloat(document.getElementById("new-product-price-" + id).value);
        if (isNaN(number)) {
            number = 0;
        }
        let list = productItems;
        let result = list.filter((proIt) => proIt.id === id);
        result = result[0];
        let index = list.indexOf(result);
        result.price = number;
        list[index] = result;
        setProductItems([...list]);
        if (modifyMode)
            onModifyMode();
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
        if (modifyMode)
            onModifyMode();
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
        if (modifyMode)
            onModifyMode();
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
        if (modifyMode)
            onModifyMode();
    }

    function setProductName(event) {
        setProduct({ ...product, name: event.target.value });
    }

    const [modifyMode, setModifyCode] = useState(true);

    function onModifyMode() {
        setModifyCode(false);
    }

    function offModifyMode() {
        setModifyCode(true);
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

    function deleteProductItem(id) {
        let list = productItems;
        let result = list.filter((proIt) => proIt.id === id);
        result = result[0];
        let index = list.indexOf(result);
        list.splice(index, 1);
        setProductItems([...list]);
    }

    function setConfiguration(id, conditions) {
        let list = productItems;
        let result = list.filter((proIt) => proIt.id === id);
        result = result[0];
        let index = list.indexOf(result);
        result.conditions = conditions;
        list[index] = result;
        setProductItems([...list]);
        if (modifyMode)
            onModifyMode();
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

    function preprocessDescription(productId) {
        if (description) {
            let ops = description.ops;
            ops.forEach(op => {
                if (op.insert?.image) {
                    let url = op.insert.image;
                    url = url.replaceAll("/0/", "/" + productId + "/");
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
        if (modifyMode)
            onModifyMode();
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
        ProductService.createProductItem(product.id, productItems).then(response => {
            let createdProductItems = response.data;
            let preProIts = preprocessUpdate(product, productItems, createdProductItems);
            for (let i = 0; i < preProIts.length; i++) {
                createdProductItems[i].productImages = preProIts[i].existedImages;
                createdProductItems[i].productConfigurations = preProIts[i].productConfigurations;
            }
            ProductService.updateProductImagesNewProductItem(createdProductItems).then(response => {
                let first = response.data[0].id;
                navigate("/administrator/products/productItemsDetail/" + first);
            })
        });
    }


    const navigate = useNavigate();

    function cancel() {
        let track = new Date();
        setReset(track.getTime());
        refresh();
    }
    return (
        <div className='main-content'>
            <div>
                <h2 className="title-page"><span><LibraryAddIcon className='icon' />Add Product Items</span></h2>
            </div>
            <h5 className='label text-muted'><DriveFileRenameOutlineIcon className='icon' /> Name</h5>
            <div className='new-name'>
                <span className="name-title">Product Name</span>
                <input id={"product-name"} onChange={setProductName} value={product.name} placeholder="New Product Name" disabled></input>
            </div>
            <h5 className='label text-muted'><CategoryIcon className='icon' /> Category</h5>
            <div className='category d-flex flex-wrap'>
                <Category goal="new-product" title="Category" value={treeCategory} data={zeroCategory} parent={0} setCategoryId={setCategory}></Category>
            </div>

            {
                productItems.map((proIt, index) => {
                    return (
                        <div key={index}>
                            <h5 className="label text-muted"> <ProductsIcon className="icon" /> <span style={{ whiteSpace: "nowrap" }}>Product Item: {index + 1} </span>
                                {
                                    index >= 1 ?
                                        <div className='ps-1 text-danger' onClick={() => deleteProductItem(proIt.id)}>
                                            <Delete></Delete>
                                        </div> : <></>
                                }
                            </h5>
                            <Variation goal={"new-product-" + proIt.id + "-variations"} categoryId={category} setConditions={(configuration) => setConfiguration(proIt.id, configuration)} reset={reset}></Variation>
                            <div className="product-modify">
                                <div className='price d-flex flex-wrap' style={{ alignItems: "center" }}>
                                    <div className='new-price'>
                                        <span className="price-title">Price</span>
                                        <input id={"new-product-price-" + proIt.id} type="number" value={proIt.price} onChange={() => setPrice(proIt.id)} placeholder="1.000"></input>
                                        <span className="price-title">$</span>
                                    </div>
                                    <div className='new-sku'>
                                        <span className="sku-title">SKU</span>
                                        <input id={"new-product-ksu-" + proIt.id} value={proIt.sku} onChange={() => setKSU(proIt.id)} placeholder="SKU0001"></input>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className="btn btn-light qty" style={{ margin: "3px", width: "40px" }} onClick={() => setQtyInStock(proIt.id, 1)}>+</button>
                                    <div className='qty-input'>
                                        <input id={"new-product-qty-" + proIt.id} type="number" min={0} value={proIt.qtyInStock} className='form-control' onChange={() => typeQtyInStock(proIt.id)} placeholder="Quanlity In Stock"></input>
                                    </div>
                                    <button className='btn btn-light qty' style={{ margin: "3px", width: "40px" }} onClick={() => setQtyInStock(proIt.id, -1)}>-</button>
                                </div>

                                <div className='product-image' style={{ margin: "3px" }}>
                                    <ProductImage product={product} productItem={proIt} imagesList={proIt.existedImages} setImagesList={(existedImages) => setExistedImages(proIt.id, existedImages)} newImages={proIt.newImages} setNewImages={(newImages) => setNewImages(proIt.id, newImages)} onModify={onModifyMode} offModifyMode={offModifyMode} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div style={{ margin: "10px", marginLeft: "3px" }}>
                <button className='btn btn-light ps-0' onClick={addNewProductItem}> <span style={{ padding: "5px" }}><AddCircleIcon /></span> New Variation </button>
            </div>
            <h5 className='label text-muted'><DriveFileRenameOutlineIcon className='icon' /> Description</h5>
            <div className='description'>
                <Editor product={product} setDescription={setDescription} reset={reset} onModifyMode={onModifyMode} offModifyMode={offModifyMode} />
            </div>
            <div className='commit d-flex'>
                <div>
                    <button className='btn btn-dark border border-danger flex-grow-1 m-1' onClick={save} disabled={modifyMode}>Save</button>
                    <button className='btn btn-dark border border-danger flex-grow-1 m-1 me-0' onClick={cancel} disabled={modifyMode}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
