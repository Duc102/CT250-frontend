import React, {useEffect, useState} from 'react';
import OrdersMoneyChart from './OrdersMoneyChart';

import DashboardService from '../../../Services/CommonService/DashboardService';
import SiteUserService from '../../../Services/CommonService/SiteUserService';
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';

import Widget from './Widget';
import HomeIcon from '@mui/icons-material/Home';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import "./Dashboard.css"
import OrdersTable from './OrdersTable';
import TopTenProductItem from './TopTenProductItem';
import { MonetizationOnOutlined, Storage, Topic } from '@mui/icons-material';
import Inventory from './Inventory';

const Dashboard = (props) => {

    const [numberUsers, setNumberUsers] = useState(0);
    const [numberOrders, setNumberOrders] = useState(0);
    const [todayOrders, setTodayOrders] = useState([]);
    const [earning, setEarning] = useState(0); 


    useEffect(()=>{
        SiteUserService.countSiteUser().then(res=>{
            setNumberUsers(res.data);
        })
        ShopOrderService.getTodayShopOrder().then(res=>{
            setTodayOrders(res.data);
            setNumberOrders(res.data.length);
        })
        ShopOrderService.getTodayEarning().then(res=>{
            setEarning(res.data);
        })
        props.setActbar("Dashboard");
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
            <h5 className='label text-muted'><ListAltRoundedIcon className='icon' /> Today's Orders</h5>
            <OrdersTable todayOrders={todayOrders}/>
            <h5 className='label text-muted'><Topic className='icon' /> Top Selling Products</h5>
            <TopTenProductItem />
            <h5 className='label text-muted'><Storage className='icon' /> Inventory</h5>
            <Inventory/>
            <h5 className='label text-muted'><MonetizationOnOutlined className='icon text-success' /> Revenue In The Year</h5>
            <OrdersMoneyChart />
        </div>
    );
}

export default Dashboard;
