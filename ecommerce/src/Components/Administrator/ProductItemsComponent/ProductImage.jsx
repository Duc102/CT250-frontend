import React from 'react'
import { useState, useEffect, useRef } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductImage(props) {
    const [imagesList, setImagesList] = useState(props.imagesList);
    const [newImages, setNewImages] = useState(props.newImages);
    const fakeId = useRef(0);
    useEffect(()=>{
        setImagesList(props.imagesList);
        setNewImages(props.newImages);
    }, [props.product, props.productItem, props.imagesList, props.newImages])

    useEffect(()=> {
        init();
    }, [imagesList, newImages])

    function init(){
        dontChooseAnyImage();
        let firstItemNo = imagesList.at(0);
        if(firstItemNo !== undefined){
            let imageLi = document.getElementById("item-no-"+props.productItem.id+"-"+firstItemNo.id);
            imageLi.classList.remove("hidden");
        } else {
            firstItemNo = newImages.at(0);
            if(firstItemNo !== undefined){
                let imageLi = document.getElementById("new-item-no-"+props.productItem.id+"-"+firstItemNo.id);
                imageLi.classList.remove("hidden");
            }
        }   
    }

    function dontChooseAnyImage(){
        imagesList.forEach(img => {
            let i = document.getElementById("item-no-"+props.productItem.id+"-"+img.id);
            if(!i.classList.contains("hidden"))
                i.classList.add("hidden");
        })
        newImages.forEach(img => {
            let i = document.getElementById("new-item-no-"+props.productItem.id+"-"+img.id);
            if(!i.classList.contains("hidden"))
                i.classList.add("hidden");
        })
    }

    function selectImage(event){
        dontChooseAnyImage();
        let name = event.currentTarget;
        let n = name.getAttribute("name");
        let li = document.getElementById(n);
        li.classList.remove("hidden");
    }


    function deleteImage(event, imgList, funcDelete){
        let imageId = event.currentTarget;
        let id = imageId.getAttribute("id");
        id = id.split("-");
        id = id[id.length -1];
        let imgs = [...imgList];
        let r = imgs.filter((img) => (img.id == id));
        r = r[0];
        let index = imgs.indexOf(r);
        if(index > -1 ){
            imgs.splice(index, 1);
            funcDelete(imgs);
        }
        props.onModify();      
    }

    // Add a new image in the new image list when user click add image button
    function uploadFile(event){
        let file = event.target.files[0]; // Get image have loaded
        let newImage = {};
        var reader = new FileReader();
        reader.onload = function (e) {
          newImage["id"] = fakeId.current;
          fakeId.current+=1;
          newImage["name"] = props.product.name + new Date().getTime(); // set name of a new image.
          newImage['needSave']= true;
          let extension = file.name;
          extension=extension.substring(extension.lastIndexOf(".")+1); // get extension from file name.
          newImage['extension']= extension;
          newImage["storageLocation"] = "/Products/" + props.product.id +"/"+ props.productItem.id; // set a storage location for save a new image of Upload file service, example: /Products/6/17
          newImage["url"] = reader.result; // url to show the image on web
          newImage["src"] = file;
        //   props.setNewImages(newImages=>[...newImages,newImage]); //add a new image in list.
          props.setNewImages([...newImages,newImage]);
          props.onModify();
        }
        reader.readAsDataURL(file);
    }
  return (
    <div className='d-flex align-items-center justify-content-center'>
        <div className='alt-image'>
            <ul className='alt-image-list'>
                {
                    imagesList.map((image, index) =>
                        <li name={"item-no-"+props.productItem.id+"-"+image.id} key={index} onClick={selectImage.bind(this)}><img src={image.url}></img></li>
                    )
                }

                {
                    newImages.map((image, index) =>
                        <li name={"new-item-no-"+props.productItem.id+"-"+image.id} key={index} onClick={selectImage.bind(this)}><img src={image.url}></img></li>
                    )
                }
                <li className='text-center'>
                    <input id={"newProductItemImage"+props.productItem.id} className="hidden" accept='image/*' type="file" multiple={true} onChange={uploadFile} />
                    <label htmlFor={"newProductItemImage"+props.productItem.id}><AddCircleIcon/></label>
                </li>
            </ul>
        </div>
        <div className='main-image-container'>
            <ul className='image-list'>
                {
                    imagesList.map((image, index) =>
                        <li id={"item-no-"+props.productItem.id+"-"+image.id} key={index} className="hidden">
                            <div className='showed-image'>
                                <img src={image.url}></img>
                            </div>

                            <div className='img-del-container'>
                                <button id={"del-"+props.productItem.id+"-"+image.id} className='btn btn-danger img-del-btn' onClick={(e)=>deleteImage(e, imagesList, props.setImagesList)}><DeleteIcon/></button>
                            </div>
                        </li>
                    )
                }

                {
                    newImages.map((image, index) =>
                        <li id={"new-item-no-"+props.productItem.id+"-"+image.id} key={index} className="hidden">
                            <div className='showed-image'>
                                <img src={image.url}></img>
                            </div>
                            <div className='img-del-container'>
                                <button id={"new-del-"+props.productItem.id+"-"+image.id} className='btn btn-danger img-del-btn' onClick={(e)=>deleteImage(e, newImages, props.setNewImages)}><DeleteIcon/></button>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    </div>
  )
}
