import axios from "axios"

const SITEUSER_BASE_URL = "http://localhost:8080/siteUser"

class SiteUserService {

    register(siteUser){
        return axios.post(SITEUSER_BASE_URL+"/register", siteUser);
    }

    login(siteUser){
        return axios.post(SITEUSER_BASE_URL+"/login", siteUser);
    }

    countSiteUser(){
        return axios.get(SITEUSER_BASE_URL+"/countSiteUser");
    }
}

export default new SiteUserService();