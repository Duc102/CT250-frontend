import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import 'react-quill/dist/quill.snow.css';

import ProductService from '../../../Services/CommonService/ProductService';
import VariationService from '../../../Services/CommonService/VariationService';
import OtherConf from './OtherConf';
import Editor from './Editor';
import EditIcon from '@mui/icons-material/Edit';

import Variation from '../ProductComponent/Variation';
import AlertNote from "../Notification/AlertNote"
import ConfirmDialog from '../Notification/ConfirmDialog';

import { findVariationOptionFromVariations } from './Execute';
import "./Style.css"
import ProductImage from './ProductImage';
import UploadFileService from '../../../Services/CommonService/UploadFileService';
export default function ProductItemsDetail() {
  const { id } = useParams();
  const [categoryId, setCategoryId] = useState(0);
  const [variationOfCategory, setVariationOfCategory] = useState([]);
  const [product, setProduct] = useState({});
  const [productItem, setProductItem] = useState({});
  const [otherProductItems, setOtherProductItems] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const originImageList = useRef([]);
  const [newImages, setNewImages] = useState([]);

  const [originDescription, setOriginDescription] = useState("");
  const [description, setDescription] = useState("");
  const [reset, setReset] = useState(0);

  const [otherConfig, setOtherConfig] = useState({});
  const [otherVariations, setOtherVariations] = useState([]);
  const [selectedOtherVarOp, setSelectedOtherVariation] = useState({}); // => for other product items
  const [conditions, setConditions] = useState([]);

  const [originConfig, setOriginConfig] = useState({});
  const [modifyConfig, setModifyConfig] = useState({});
  const [modifyProductName, setModifyProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [qtyInStock, setQtyInStock] = useState(0);

  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "info" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "", commit: () => { } });

  const navigate = useNavigate();

  useEffect(() => {
    let product, productItem;
    // Get product item detail
    ProductService.getProductItemsDetail(id).then((response) => {
      productItem = response.data;
      setProductItem(productItem);
      setOtherProductItems([productItem]);

      setImagesList(productItem.productImages);
      originImageList.current = [...productItem.productImages];

      setPrice(productItem.price);
      setQtyInStock(productItem.qtyInStock);
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
      setOriginConfig(VAO);
      setModifyConfig(VAO);
      setConditions(initConditions);
    })

    // Get other product item of the same product but differ the configuration
    ProductService.getProductByProductItemId(id).then(res => {
      product = res.data;
      setProduct(product);
      setModifyProductName(product.name);
      setCategoryId(product.productCategory.id);
      VariationService.getVariationAlongCategoryId(product.productCategory.id).then((response) => {
        let tmpVar = response.data;
        setVariationOfCategory(tmpVar);
      })

      UploadFileService.readProductDescriptionsFile(product.id).then(response => {
        setOriginDescription(response.data);
        setDescription(response.data);
      });
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

  const [priceInputClass, setPriceInputClass] = useState('form-control price-lg-detail close-price-input');
  const [priceSpanClass, setPriceSpanClass] = useState('form-control price-lg-detail');
  const [modifyMode, setModifyCode] = useState(true);

  const qty = useRef(0);
  const pri = useRef(0);
  const haveChangedConfig = useRef(false);



  function changeProductName(event) {
    setModifyProductName(event.target.value);
    if (modifyMode)
      onModifyMode();

  }
  // Increase or decrease when click on +/- button
  function changeQtyInStock(number) {
    if (qtyInStock + number >= 0)
      setQtyInStock(qtyInStock + number);
    if (modifyMode)
      onModifyMode();
  }

  // Type number of products
  function typeQtyInStock() {
    let number = Number(qty.current.value);
    if (!isNaN(number)) {
      qty.current.value = "";
      setQtyInStock(number);
    }
    if (modifyMode)
      onModifyMode();
  }

  // Change configurations
  function changeConfig(newConfig) {
    setModifyConfig(newConfig);
    haveChangedConfig.current = true;
    if (modifyMode)
      onModifyMode();
  }



  // Cancel changed
  function cancel() {
    setModifyProductName(product.name);
    setPrice(productItem.price);
    setQtyInStock(productItem.qtyInStock);
    setModifyConfig(originConfig);
    setImagesList(originImageList.current);
    setDescription(originDescription);
    setReset(reset + 1);
    setNewImages([]);
    if (!modifyMode)
      offModifyMode();
  }


  function preprocessConfigBeforeSave() {
    let newConfig = [];
    // Keys are id of variation of the product item
    let keys = Object.keys(modifyConfig);
    keys.forEach(key => {
      // Value of key is id of variation option
      let varOp = modifyConfig[key];
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

  function preprocessImageListBeforSave() {
    let saveImage = [];
    newImages.forEach((img) => {
      let i = {};
      i["id"] = 0;
      // URL to save in database. Example: "/Images/Products/6/17/link.png"
      i["url"] = "/Images/Products/" + product.id + "/" + productItem.id + "/" + img.name.replaceAll(" ", "") + "." + img.extension;
      saveImage.push(i);
      // Save image in hard disk before save it in database.
      UploadFileService.uploadFile(img.name, img.storageLocation, img.src);
    })
    // combine the existing image list with the new image list
    return [...imagesList, ...saveImage];
  }

  function storeDescriptionBeforeSave() {
    UploadFileService.uploadJsonFile("description.json", "/Products/Descriptions/" + product.id, description).then(response => {
      console.log(response.data);
    });
  }

  function showInfo(info) {
    console.log(info);
  }


  // Save changed
  function save() {
    let newImages = preprocessImageListBeforSave();
    storeDescriptionBeforeSave();
    let newConfig = [];
    if (haveChangedConfig.current) {
      newConfig = preprocessConfigBeforeSave();
      haveChangedConfig.current = false;
    } else {
      newConfig = productItem.productConfigurations;
    }
    ProductService.updateProduct({ ...product, name: modifyProductName });
    ProductService.updateProductItemDetail({ ...productItem, price: price, qtyInStock: qtyInStock, productConfigurations: newConfig, productImages: newImages });
    setImagesList(newImages);
    setNewImages([]);
    setNotify({isOpen: true, message: "Update successful!", type: "success"});
    if (!modifyMode)
      offModifyMode();
  }

  // Delete a product
  function quickDelete() {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure delete this product item?",
      subTitle: "You can't undo this operation.",
      commit: () => {
        ProductService.deleteProductItem(productItem.id).then((response) => {
          navigate("/administrator/products");
        });
      }
    });
  }

  // Show/hide input price 
  function changePriceInputClass() {
    if (priceInputClass.includes("close-price-input")) {
      setPriceInputClass("form-control price-lg-detail")
      setPriceSpanClass(priceInputClass + " close-price-input")
    }
    else {
      setPriceInputClass(priceInputClass + " close-price-input")
      setPriceSpanClass("form-control price-lg-detail");
    }
    if (modifyMode)
      onModifyMode();

  }

  // Focus intput price when click on the modify button
  useEffect(() => {
    if (!priceInputClass.includes("close-price-input")) {
      pri.current.focus();
    }
  }, [priceInputClass])

  // Change price of a product when type from the keyboard
  function changePrice() {
    let number = pri.current.value;
    setPrice(number);
  }

  function finishChange() {
    let number = parseFloat(pri.current.value);
    if (isNaN(number))
      setPrice(0);
    else {
      setPrice(number);
    }
  }

  function onModifyMode() {
    setModifyCode(false);
  }

  function offModifyMode() {
    setModifyCode(true);
  }

  return (
    <div className='main-content'>
      <div className='model-name-container'>
        <h1 className='product-name-detail'>
          <ContentEditable html={modifyProductName} tagName='span' onChange={changeProductName}></ContentEditable>
          <Config config={productItem.productConfigurations} /></h1>
      </div>
      <div className='main-modify'>
        <div className='product-image'>
          <ProductImage product={product} productItem={productItem} imagesList={imagesList} setImagesList={setImagesList} newImages={newImages} setNewImages={setNewImages} onModify={onModifyMode} offModifyMode={offModifyMode} />
        </div>
        <div className="product-modify">
          <div className='d-flex' style={{ alignItems: "center" }}>
            <input className={priceInputClass} ref={pri} onChange={changePrice} onMouseOut={() => { changePriceInputClass(); finishChange() }} value={price}></input>
            <span className={priceSpanClass}>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(price)}</span>
            <button className='btn btn-light edit ms-2' style={{ marginRight: "3px", width: "41px", height: "37px", padding: "0px" }} onClick={changePriceInputClass}><EditIcon className="edit-button" /></button>
          </div>
          <div className='d-flex mt-1 justify-content-center'>
            <button className="btn btn-light qty" style={{ margin: "3px", width: "40px" }} onClick={() => changeQtyInStock(1)}>+</button>
            <div className='qty-input'>
              <input type="number" min={0} ref={qty} className='form-control' onChange={typeQtyInStock} value={qtyInStock}></input>
            </div>
            <button className='btn btn-light qty' style={{ margin: "3px", width: "40px" }} onClick={() => changeQtyInStock(-1)}>-</button>
          </div>
          <Variation goal="modify-new-config" categoryId={categoryId} setConditions={changeConfig} init={modifyConfig} reset={reset}></Variation>
        </div>
      </div>

      <div className="section-line"> DESCRIPTION </div>

      <div className='description'>
        <Editor product={product} setDescription={setDescription} reset={reset} onModifyMode={onModifyMode} offModifyMode={offModifyMode} />
      </div>

      <div className='commit d-flex'>
        <div>
          <button className='btn btn-danger flex-grow-1 m-1 ms-0' onClick={quickDelete}>Delete</button>
          <button className='btn btn-dark border border-danger flex-grow-1 m-1' onClick={save} disabled={modifyMode}>Save</button>
          <button className='btn btn-dark border border-danger flex-grow-1 m-1 me-0' onClick={cancel} disabled={modifyMode}>Cancel</button>
        </div>
      </div>
      <div className="section-line"> OTHER PRODUCT ITEM </div>
      <div>
        <OtherConf other={otherConfig} selected={selectedOtherVarOp} fun={selectAnotherProductItem} productItems={otherProductItems} productId={product.id} />
      </div>
      <AlertNote notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}></ConfirmDialog>
    </div>
  )
}
