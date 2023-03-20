import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';
import ProductItemLine from './ProductItemLine';

import PersonIcon from '@mui/icons-material/Person';
import ProductsIcon from '@mui/icons-material/Inventory';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import PriceCheckRoundedIcon from '@mui/icons-material/PriceCheckRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
const ShopOrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState();
    const originOrder = useRef({});
    const [orderStatus, setOrderStatus] = useState([]);
    const [modifyMode, setModifyCode] = useState(true);

    useEffect(() => {
        ShopOrderService.getShopOrderById(id).then(response => {
            console.log(response.data);
            setOrder(response.data);
            originOrder.current = {...response.data};
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

    function processDate(dateTime) {
        let MonthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(dateTime);
        let result = date.getDate() + " " + MonthsOfYear[date.getMonth()] + " " + date.getFullYear();
        return result;
    }

    function changeOrderStatus(event) {
        let select = event.currentTarget.value;
        let status = orderStatus.filter(st => parseInt(st.id) === parseInt(select));
        setOrder({ ...order, orderStatus: status[0] });
        if(modifyMode){
            onModifyMode();
        }
    }

    function updateOrderStatus(){
        ShopOrderService.updateShopOrderStatus(order.id, order.orderStatus.id).then(response=>{
            console.log(response.data);
        });
        if(!modifyMode){
            onModifyMode();
        }
    }

    function cancel(){
        setOrder({...originOrder.current});
        if(!modifyMode)
            offModifyMode();
    }

    function onModifyMode(){
        setModifyCode(false);
    }
    
    function offModifyMode(){
        setModifyCode(true);
    }
    if (order)
        return (
            <div className="main-content order-detail text-white">
                <div>
                    <h2 className="title-page"><span><ListAltRoundedIcon className='icon'/>Order Number {order.id}</span></h2>
                </div>
                <div>
                    <h5 className='label text-muted'><PersonIcon className='icon' /> Customer {order.siteUser.id}</h5>
                    <div className='info-field-container text-black'>
                        <div className='info-field'><BadgeIcon className='icon' /><span className='info-title'>Name</span> {order.siteUser.name}</div>
                        <div className='info-field'><EmailIcon className='icon' /> <span className='info-title'>Email</span> {order.siteUser.emailAddress}</div>
                    </div>
                    <div className='info-field-container text-black'>
                        <div className='info-field'><LocationOnIcon className='icon' /> <span className='info-title'>Address</span> {processAddress(order.shippingAddress)}</div>
                    </div>
                    <div className='info-field-container text-black'>
                        <div className='info-field'><LocalPhoneIcon className='icon' /><span className='info-title'>Phone number</span> {order.siteUser.phoneNumber}</div>
                        <div className='info-field'><CreditCardRoundedIcon className='icon' /><span className='info-title'>Payment method</span></div>
                    </div>

                    <div className='info-field-container text-black'>
                        <div className='info-field'><CalendarMonthRoundedIcon className='icon' /><span className='info-title'>Date create</span> {processDate(order.dateCreate)}</div>
                        <div className='info-field'><CalendarMonthRoundedIcon className='icon' /><span className='info-title'>Last update</span> {processDate(order.dateUpdate)}</div>
                    </div>

                    <div className='info-field-container text-black'>
                        <div className='info-field'>
                            <span className='info-title'>Order status</span>
                            <select className={'status-color-' + order.orderStatus.id} id={"order-status-" + order.id} value={order.orderStatus.id} onChange={(event) => changeOrderStatus(event)}>
                                {
                                    orderStatus.map((st, index) =>
                                        <option key={index} value={st.id}>{st.status}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='order-list'>
                    <h5 className='label text-muted'><ProductsIcon className='icon' /> Products</h5>
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
                    <div className='info-field-container text-black'>
                        <div className='info-field'><LocalAtmRoundedIcon className="icon text-success" /><span className='info-title'>Total</span> <span className='price-color'>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(order.orderTotal)}</span></div>
                        <div className='info-field'><PriceCheckRoundedIcon className="icon text-success" /><span className='info-title'>Paid</span></div>
                    </div>
                </div>
                <div className='commit d-flex'>
                    <div>
                        <button className='btn btn-success flex-grow-1 m-1'>Export bill</button>
                        <button className='btn btn-dark border border-danger flex-grow-1 m-1' disabled={modifyMode} onClick={updateOrderStatus}>Save</button>
                        <button className='btn btn-danger border border-danger flex-grow-1 m-1'>Delete</button>
                        <button className='btn btn-dark border border-danger flex-grow-1 m-1 me-0' disabled={modifyMode} onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    else return <></>
}

export default ShopOrderDetail;
