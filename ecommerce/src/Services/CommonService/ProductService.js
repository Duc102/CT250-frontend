import axios from "axios";

const PRODUCT_BASE_URL = "http://localhost:8080/administrator/products";

class ProductService {

    createProduct(newProduct){
        return axios.post(PRODUCT_BASE_URL + "/new", newProduct);
    }

    createProductItem(productId, newProductItem){
        return axios.post(PRODUCT_BASE_URL +"/new/"+productId+"/productItem", newProductItem);
    }

    updateProductImagesNewProductItem(newProductItem){
        return axios.post(PRODUCT_BASE_URL +"/new/productItem/productImages", newProductItem);
    }
    
    getProductItemByCategoryWithConfiguration(categoryId, conditions){
        return axios.post(PRODUCT_BASE_URL + "/category/"+categoryId+"/conditions", conditions);
    }

    async getProductByProductItemId(productItemId){
        return await axios.get(PRODUCT_BASE_URL + "/productItem/" +productItemId + "/info");
    }

    getProductById(id){
        return axios.get(PRODUCT_BASE_URL +"/"+id);
    }

    getProductItemByCategoryId(categoryId){
        return axios.get(PRODUCT_BASE_URL + "/productItem/category/" + categoryId);
    }

    getAllProductItems(){
        return axios.get(PRODUCT_BASE_URL + "/productItem/all");
    }

    getProductItemsDetail(id){
        return axios.get(PRODUCT_BASE_URL + "/productItemsDetail/" + id);
    }

    getOtherConfigurationsOfProduct(id, conditions){
        return axios.post(PRODUCT_BASE_URL + "/otherConfigurations/product/" + id, conditions);
    }

    getProductItemsByProductIdAndConfiguration(id, conditions){
        return axios.post(PRODUCT_BASE_URL + "/productItems/product/"+id, conditions);
    }

    updateProduct(product){
        return axios.post(PRODUCT_BASE_URL + "/product/"+product.id, product);
    }

    updateProductItem(productItem){
        return axios.put(PRODUCT_BASE_URL + "/productItem/quickUpdate/" + productItem.id, productItem);
    }

    updateProductItemDetail(productItem){
        return axios.put(PRODUCT_BASE_URL + "/productItemDetail/update/" + productItem.id, productItem);
    }

    deleteProductItem(id){
        return axios.delete(PRODUCT_BASE_URL + "/productItem/quickDelete/" + id);
    }

    // =========RAW==========
    getProductByCategoryId(id) {
        return axios.get(PRODUCT_BASE_URL + "/category/" + id);
    }

    getAllProducts() {
        return axios.get(PRODUCT_BASE_URL + "/category/all");
    }

    getProductByConfiguration(conditions){
        return axios.post(PRODUCT_BASE_URL + "/conditions", conditions);
    }
    getProductsByName(name) {
        return axios.get(PRODUCT_BASE_URL+"/search/"+name)
    }

    getProductItemsWhereQtyNearestZero(){
        return axios.get(PRODUCT_BASE_URL +"/productItemsWhereQtyNearestZero");
    }
}

export default new ProductService();

