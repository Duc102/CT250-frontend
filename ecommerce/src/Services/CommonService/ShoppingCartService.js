import axios from "axios"

const SHOPPING_CART_BASE_URL = "http://localhost:8080/shoppingCart"

class SiteUserService {

    getShopingCartById(id){
        return axios.get(SHOPPING_CART_BASE_URL+"/" + id);
    }

    getShoppingCartByUserId(id){
        return axios.get(SHOPPING_CART_BASE_URL+"/siteUser/"+id);
    }
    addShoppingCartItem(shoppingCartItem){
        return axios.post(SHOPPING_CART_BASE_URL+"/addShoppingCartItem", shoppingCartItem);
    }

    updateShoppingCartItem(shoppingCartItem){
        return axios.post(SHOPPING_CART_BASE_URL+"/updateShoppingCartItem", shoppingCartItem);
    }

    deleteShoppingCartItem(shoppingCartItem){
        return axios.post(SHOPPING_CART_BASE_URL+"/deleteShoppingCartItem", shoppingCartItem);
    }
}

export default new SiteUserService();