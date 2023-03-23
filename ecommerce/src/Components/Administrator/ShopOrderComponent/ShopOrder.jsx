import React from 'react'
import { useState, useEffect} from 'react';
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';
import OrdersContext from './OrdersContext';


import "./ShopOrder.css";
import ShopOrderList from './ShopOrderList';
import FunctionsIcon from '@mui/icons-material/Functions';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const ShopOrder = () => {

    const [orderStatus, setOrderStatus] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        ShopOrderService.getAllOrderStatus().then(response => {
            setOrderStatus(response.data);
        });
        getAllShopOrders();
    }, [])

    function search() {
        let search = document.getElementById("search-value").value;
        let id = parseInt(search);
        if (!isNaN(id)) {
            getShopOrderById(id);
        }
    }

    function filter() {
        let date = document.getElementById("date-value").value;
        let dateTime = new Date(date);
        let utc = new Date(Date.UTC(dateTime.getFullYear(),
            dateTime.getMonth(),
            dateTime.getDate(),
            dateTime.getHours(),
            dateTime.getMinutes(),
            dateTime.getSeconds()));

        console.log(utc);
        console.log(dateTime)
        if (dateTime.getDate())
            ShopOrderService.getShopOrderInDateTime(utc).then(response => {
                setOrders(response.data);
                console.log(response.data);
            })
    }


    function getAllShopOrders() {
        ShopOrderService.getAllShopOrders().then(response => {
            setOrders(response.data);
            console.log(response.data);
        });
    }

    function getShopOrderByOrderStatus(id) {
        ShopOrderService.getShopOrderByOrderStatus(id).then(response => {
            setOrders(response.data);
            console.log(response.data);
        });

    }

    function getShopOrderById(id) {
        ShopOrderService.getShopOrderById(id).then(response => {
            setOrders([response.data]);
        });
    }

    function getAllOrderStatus() {
        ShopOrderService.getAllOrderStatus().then(response => {
            console.log(response.data);
        });

    }
    return (
        <div className='main-content'>
            <div>
                <h2 className="title-page"><span><ListAltRoundedIcon className='icon' />Orders</span></h2>
            </div>
            <h5 className='label text-muted'><FilterAltIcon className='icon' /> Filter</h5>
            <div className="order-status-container">
                <div className="order-status" onClick={getAllShopOrders}>
                    <span>All Orders</span>
                </div>
                {
                    orderStatus.map((status, index) => {
                        return (
                            <div key={index} className="order-status" onClick={() => { getShopOrderByOrderStatus(status.id) }}>
                                <span>
                                    {status.status}
                                </span>

                            </div>
                        )
                    })
                }
            </div>
            <div className='d-flex align-item-center'>
                <div className='search-box'>
                    <input id="search-value" type="search" placeholder='Search order by id ...'></input>
                    <span className="icon" onClick={search}><SearchIcon style={{ color: "white" }} /></span>
                </div>
                <div className='search-box'>
                    <input id="date-value" type='datetime-local'></input>
                    <span className="icon" onClick={filter}><FilterListIcon style={{ color: "white" }} /></span>


                </div>
            </div>
            <h5 className='label text-muted'><FunctionsIcon className='icon' />Result: {orders.length} order(s)</h5>
            
            <div>
                <OrdersContext.Provider value={{orders: orders, setOrders: setOrders}}>
                    <ShopOrderList orders={orders} status={orderStatus} />
                </OrdersContext.Provider>
            </div>
        </div>
    )
}

export default ShopOrder;
