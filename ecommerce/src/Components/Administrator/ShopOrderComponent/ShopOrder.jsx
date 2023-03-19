import React from 'react'
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useEffect } from 'react';
import "./ShopOrder.css"
import ShopOrderList from './ShopOrderList';

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
        if (dateTime.getDate())
            ShopOrderService.getShopOrderInDateTime(dateTime).then(response => {
                setOrders(response.data);
            })
    }


    function getAllShopOrders() {
        ShopOrderService.getAllShopOrders().then(response => {
            setOrders(response.data);
        });
    }

    function getShopOrderByOrderStatus(id) {
        ShopOrderService.getShopOrderByOrderStatus(id).then(response => {
            setOrders(response.data);
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
        <div>
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

            <div>
                <ShopOrderList orders={orders} status={orderStatus}/>
            </div>

            {/* <div className='m-3'>
                <button onClick={getAllShopOrders}>All Orders</button>
                <button onClick={() => { getShopOrderByOrderStatus(1) }}>Order By Status</button>
                <button onClick={() => getShopOrderById(1)}>Order By Id</button>
                <button onClick={getAllOrderStatus}>All Status</button>
            </div> */}
        </div>
    )
}

export default ShopOrder;
