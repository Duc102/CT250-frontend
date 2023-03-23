import axios from "axios";

const DASHBOARD_BASE_URL = "http://localhost:8080/administrator/dashboard";

class DashboardService {
    getRevenue(year){
        return axios.get(DASHBOARD_BASE_URL+"/revenue/"+year);
    }
}

export default new DashboardService()