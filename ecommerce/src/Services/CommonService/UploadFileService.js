import axios from 'axios';

const UPLOAD_BASE_URL = "http://localhost:8080/file";

class UploadFileService {
    
    uploadFile(fileName, storageLocation, file){
        const formData = new FormData();
        formData.append("editName", fileName.replaceAll(" ", ""));
        formData.append("storageLocation", storageLocation);
        formData.append("file", file);
        return axios.post(UPLOAD_BASE_URL+"/uploadFile", formData);
    }

    uploadJsonFile(name, storageLocation, file){
        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('storageLocation', storageLocation);
        // formData.append('contents', JSON.stringify(file));
        return axios.post(UPLOAD_BASE_URL+"/uploadFile/json?fileName="+name+"&storageLocation="+storageLocation,file);
    }

    readProductDescriptionsFile(productId){
        return axios.get(UPLOAD_BASE_URL+"/readFile/productDescriptions/"+productId,);
    }
}

export default new UploadFileService();

