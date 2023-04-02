import React from 'react'
import { useState, useEffect, useRef } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Download } from '@mui/icons-material';

export default function ProductImage(props) {
    const [imagesList, setImagesList] = useState([]);
    useEffect(() => {
        if (props.productItem.productImages)
            setImagesList(props.productItem.productImages);
    }, [props.product, props.productItem])

    useEffect(() => {
        init();
    }, [imagesList])

    function init() {
        dontChooseAnyImage();
        let firstItemNo = imagesList.at(0);
        if (firstItemNo !== undefined) {
            let imageLi = document.getElementById("item-no-" + props.productItem.id + "-" + firstItemNo.id);
            imageLi.classList.remove("hidden");
        }
    }

    function dontChooseAnyImage() {
        imagesList.forEach(img => {
            let i = document.getElementById("item-no-" + props.productItem.id + "-" + img.id);
            if (!i.classList.contains("hidden"))
                i.classList.add("hidden");
        })
    }

    function selectImage(event) {
        dontChooseAnyImage();
        let name = event.currentTarget;
        let n = name.getAttribute("name");
        let li = document.getElementById(n);
        li.classList.remove("hidden");
    }
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <div className='alt-image'>
                <ul className='alt-image-list'>
                    {
                        imagesList.length === 0 ?
                            <></>
                            :
                            imagesList.map((image, index) =>
                                <li name={"item-no-" + props.productItem.id + "-" + image.id} key={index} onClick={selectImage.bind(this)}><img src={image.url}></img></li>
                            )
                    }
                    <li></li>
                </ul>
            </div>
            <div className='main-image-container'>
                <ul className='image-list'>
                    {
                        (imagesList.length === 0) ?
                            <li>
                                <div className='showed-image'>
                                    <label htmlFor={"newProductItemImage" + props.productItem.id}>
                                        <img src="/Images/Products/placeholderImage.png" style={{ cursor: "pointer" }}></img>
                                    </label>
                                </div>
                            </li>
                            :
                            imagesList.map((image, index) =>
                                <li id={"item-no-" + props.productItem.id + "-" + image.id} key={index} className="hidden">
                                    <div className='showed-image'>
                                        <img src={image.url}></img>
                                    </div>
                                    <div className='d-flex align-items-center pe-1'>
                                        <button className='btn btn-light border border-dark'><Download /></button>
                                    </div>
                                </li>
                            )
                    }
                </ul>
            </div>
        </div>
    )
};
