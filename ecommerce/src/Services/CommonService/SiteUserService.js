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

    getAllSiteUsers(){
        return axios.get(SITEUSER_BASE_URL + "/allSiteUsers");
    }

    getSiteUsersByName(name){
        return axios.get(SITEUSER_BASE_URL + "/getSiteUsersByName/"+name);
    }

    getSiteUserById(id){
        return axios.get(SITEUSER_BASE_URL + "/getSiteUserById/"+id);
    }

    updateInfo(siteUser){
        return axios.post(SITEUSER_BASE_URL + "/updateInfo", siteUser);
    }

    deleteSiteUser(id){
        return axios.delete(SITEUSER_BASE_URL+"/deleteSiteUser/"+id);
    }
}

export default new SiteUserService();