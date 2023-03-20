import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';
import ProductItemLine from './ProductItemLine';

import PersonIcon from '@mui/icons-material/Person';
import ProductsIcon from '@mui/icons-material/Inventory';

const ShopOrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState();
    const [orderStatus, setOrderStatus] = useState([]);
    
    useEffect(() => {
        ShopOrderService.getShopOrderById(id).then(response => {
            console.log(response.data);
            setOrder(response.data);
            ShopOrderService.getAllOrderStatus().then(response => {
                setOrderStatus(response.data);
            });
        })
    }, []);

    function processAddress(objAddress) {
        let fa = objAddress.firstAddressLine;
        let sa = objAddress.secondAddressLine;
        let city = objAddress.city;
        let country = objAddress.country.name;
        return fa + ", " + sa + ", " + city + ", " + country;
    }

    function processDate(dateTime){
        let MonthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(dateTime);
        let result = date.getDate() +" "+ MonthsOfYear[date.getMonth()] + " " + date.getFullYear();
        return result;
    }

    function changeOrderStatus(event){
        let select = event.currentTarget.value;
        let status = orderStatus.filter(st=> parseInt(st.id) === parseInt(select));
        setOrder({...order, orderStatus: status[0]});
    }
    if (order)
        return (
            <div className="main-content order-detail text-white">
                <div>Order number {order.id}</div>
                <div>
                    <h5 className='label text-muted'><PersonIcon className='icon'/> Customer {order.siteUser.id}</h5>
                    <div>
                        <div>Name {order.siteUser.name}</div>
                        <div>Email {order.siteUser.emailAddress}</div>
                    </div>

                    <div>Address {processAddress(order.shippingAddress)}</div>
                    <div>
                        <div>Phone number: {order.siteUser.phoneNumber}</div>
                        <div>Payed method</div>
                    </div>
                    <div>Date create: {processDate(order.dateCreate)}</div>
                    <div>Order status: 
                        <select className={'status-color-' + order.orderStatus.id} id={"order-status-" + order.id} value={order.orderStatus.id} onChange={(event) => changeOrderStatus(event)}>
                            {
                                orderStatus.map((st, index) =>
                                    <option key={index} value={st.id}>{st.status}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>Last update: {processDate(order.dateUpdate)}</div>
                </div>
                <div className='order-list'>
                    <h5 className='label text-muted'><ProductsIcon className='icon'/> Products</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.orderLines.map((orderLine, index) => <ProductItemLine key={index} no={index} productLine={orderLine} />)
                            }
                        </tbody>
                    </table>
                    <div>Total {Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(order.orderTotal)}</div>
                    <div>Paid</div>
                </div>
                <div>
                    <button>Export</button>
                    <button>Save</button>
                    <button>Delete</button>
                </div>
            </div>
        );
    else return <></>
}

export default ShopOrderDetail;
