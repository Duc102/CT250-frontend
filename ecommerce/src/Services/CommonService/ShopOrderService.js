import axios from "axios";

const ORDER_BASE_URL = "http://localhost:8080/administrator/orders";

class ShopOderService {

    getAllShopOrders(){
        return axios.get(ORDER_BASE_URL+"/getAllShopOrders");

    }

    getShopOrderByOrderStatus(id){
        return axios.get(ORDER_BASE_URL+"/getShopOrders/status/" + id);

    }

    getShopOrderById(id){
        return axios.get(ORDER_BASE_URL+"/getShopOrder/"+id);
    }

    getShopOrderInDateTime(dateTime){
        return axios.post(ORDER_BASE_URL+"/getShopOrder/dateTime", dateTime);
    }

    getAllOrderStatus(){
        return axios.get(ORDER_BASE_URL+"/getAllOrderStatus");
    }

}

export default new ShopOderService();