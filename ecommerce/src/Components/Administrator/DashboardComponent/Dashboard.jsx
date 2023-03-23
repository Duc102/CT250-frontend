import React, {useEffect, useState} from 'react';
import OrdersMoneyChart from './OrdersMoneyChart';

import DashboardService from '../../../Services/CommonService/DashboardService';
import SiteUserService from '../../../Services/CommonService/SiteUserService';
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';

import Widget from './Widget';
import HomeIcon from '@mui/icons-material/Home';
import "./Dashboard.css"

const Dashboard = () => {

    const [numberUsers, setNumberUsers] = useState(0);
    const [numberOrders, setNumberOrders] = useState(0);
    const [earning, setEarning] = useState(0); 


    useEffect(()=>{
        SiteUserService.countSiteUser().then(res=>{
            console.log("Count: ", res.data);
            setNumberUsers(res.data);
        })
        ShopOrderService.getTodayShopOrder().then(res=>{
            console.log("Today shop orders: ", res.data);
            setNumberOrders(res.data.length);
        })
        ShopOrderService.getTodayEarning().then(res=>{
            console.log("Earning: ", res.data);
            setEarning(res.data);
        })
    },[])

    return (
        <div className='main-content'>
            <div>
                <h2 className="title-page"><span><HomeIcon className='icon' />Dashboard</span></h2>
            </div>
            <div className="widget-container">
                <Widget goal="user" counter={numberUsers}/>
                <Widget goal="order" counter={numberOrders}/>
                <Widget goal="earning" counter={earning}/>
            </div>  
            <OrdersMoneyChart />
        </div>
    );
}

export default Dashboard;
