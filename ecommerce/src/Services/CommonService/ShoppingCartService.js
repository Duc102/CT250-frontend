import axios from "axios"

const SHOPPING_CART_BASE_URL = "http://localhost:8080/shoppingCart"

class SiteUserService {

    getShopingCartById(id){
        return axios.get(SHOPPING_CART_BASE_URL+"/" + id);
    }
}

export default new SiteUserService();