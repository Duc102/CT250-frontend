import React from 'react';
import { useState, useEffect, useRef, memo} from 'react';
import 'react-quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import "./Style.css";


import UploadFileService from '../../../Services/CommonService/UploadFileService';
function Editor(props) {
    const {quill, quillRef} = useQuill();
    let autoEdit = useRef(true);
    const id = useRef(0);

    useEffect(()=>{
        if(quill){
            quill.on("editor-change",(delta, oldDelta, source)=>{
                let content = quill.getContents();
                props.setDescription(content);
                if(autoEdit.current){
                    autoEdit.current = false;
                    props.offModifyMode();
                } else {
                    if(delta === "text-change"){
                        props.onModifyMode();
                    }
                }
            });
            quill.getModule('toolbar').addHandler('image', selectLocalImage);
        }
    },[quill])

    useEffect(() => {
        if(props.product?.id){
            UploadFileService.readProductDescriptionsFile(props.product.id).then(response=>{
                props.setDescription(response.data);
                if(quill){
                    quill.setContents(response.data);
                    autoEdit.current = true;
                    props.offModifyMode();
                    quill.getModule('toolbar').addHandler('image', selectLocalImage);
                } 
            });
        }
    }, [props.product, props.reset]);


    const insertToEditor = (url) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
    }

    const saveToServer = (newImage) => {
        UploadFileService.uploadFile(newImage.name, newImage.storageLocation, newImage.src).then((response) =>{
            insertToEditor(response.data.downloadUri);
        });
    }

    function onInsertImage(input){
        const file = input.files[0];
        var newImage = {};
        newImage["name"] = "Description" + new Date().getTime(); // set name of a new image.
        let extension = file.name;
        extension=extension.substring(extension.lastIndexOf(".")+1); // get extension from file name.
        newImage['extension']= extension;
        newImage["storageLocation"] = "/Products/"+props.product.id+"/Images"; // set a storage location for save a new image of Upload file service, example: /Products/6/17
        newImage["src"] = file;
        saveToServer(newImage);
    }

    const selectLocalImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', "file");
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = () => {
            onInsertImage(input);
        }
        
    }
    
    return (
        <div>
            <div className="descriptions" ref={quillRef}></div>
        </div>
    )
    
  }
export default memo(Editor);

// Editor.modules = {
//     toolbar: {
//         container: [
//             [{header: "1"}, {header: "2"}, {header: [3, 4, 5, 6]},{font: []}],
//             [{size: []}],
//             ["bold", "italic", "underline", "strike", "blockquote"],
//             [{list: "ordered"}, {list: "bullet"}],
//             ["link", "image", "video"],
//             ["clean"],
//             ["code-block"],
//         ],
//         handlers: {
//             image: imageHandler
//         }
//     } ,
// };

// function  imageHandler() {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', "image/*");
//     input.click();

//     input.onchange = async () => {
//         let file = input.files[0];
//         console.log(file.name);
//         console.log(this.ref.current);
//     }
//     console.log("XYZ");
// }

// Editor.formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blackquote",
//     "list",
//     "bullet",
//     "link",
//     "image",
//     "video",
//     "code-block",
// ]

