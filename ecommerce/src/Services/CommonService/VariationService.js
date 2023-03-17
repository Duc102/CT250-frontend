import axios from 'axios';

const VARIATION_BASE_URL = "http://localhost:8080/administrator/variation";

class VariationService {
    
    getVariationAlongCategoryId(id){
        return axios.get(VARIATION_BASE_URL + "/category/" + id);
    }

    getVariationOptionOfVariation(id){
        return axios.get(VARIATION_BASE_URL + "/" + id +"/variationOption")
    }

    getNameOfVariationByVariationOptionId(id){
        return axios.get(VARIATION_BASE_URL + "/nameOfVariation/variationOption/" + id);
    }

    getVariationByVariationOptionId(id){
        return axios.get(VARIATION_BASE_URL + "/variationOption/" + id);
    }
}

export default new VariationService();

