import React from 'react';
import { useState, useEffect, useRef, memo } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import "./ItemDetail.css"

import UploadFileService from '../../../Services/CommonService/UploadFileService';
function Desciption(props) {
    const { quill, quillRef } = useQuill({readOnly: true, modules:{toolbar: {container: []}}});
    
    useEffect(() => {
        if (props.product?.id) {
            UploadFileService.readProductDescriptionsFile(props.product.id).then(response => {
                if (quill) {
                    quill.setContents(response.data);
                }
            });
        } else {
            if (quill) {
                quill.setContents({ops: [{insert: "\n"}]});
            }
        }
    }, [props.product]);

    return (
        <div className='des-container'>
            <div className="user-descriptions" ref={quillRef}></div>
        </div>
    )

}
export default memo(Desciption);
