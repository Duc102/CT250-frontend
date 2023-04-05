import axios from "axios"

const PAYMENT_BASE_URL = "http://localhost:8080/payment"

class PaymentService {

    getAllPaymentMethod(){
        return axios.get(PAYMENT_BASE_URL +"/getAllPaymentMethods");
    }
}

export default new PaymentService();