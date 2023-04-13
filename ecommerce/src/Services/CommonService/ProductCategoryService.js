import axios from "axios"

const PRODUCT_CATEGORY_BASE_URL = "http://localhost:8080/administrator/productCategory"

class ProductCategoryService {

    getProductCategoryById(id) {
        return axios.get(PRODUCT_CATEGORY_BASE_URL + "/" + id);
    }

    getProductCategoryZeroLevel(){
        return axios.get(PRODUCT_CATEGORY_BASE_URL + "/level/0");
    }

    getChildrenOfProductCategory(id){
        return axios.get(PRODUCT_CATEGORY_BASE_URL + "/" + id + "/children")
    }
    findProductCategoryByName(name) {
        return axios.get(PRODUCT_CATEGORY_BASE_URL+"/search/"+name)
    }
}

export default new ProductCategoryService();
