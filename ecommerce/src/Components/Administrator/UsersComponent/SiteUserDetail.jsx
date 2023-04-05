import { BadgeRounded, CreditCardRounded, Email, ListAltRounded, LocalPhone, LocationOn, Person } from '@mui/icons-material';
import { Badge, BadgeMark } from '@mui/material';
import { useParams } from 'react-router-dom';
import OrdersContext from '../ShopOrderComponent/OrdersContext';
import React, { useState, useEffect } from 'react';
import SiteUserService from '../../../Services/CommonService/SiteUserService';
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';
import ShopOrderList from '../ShopOrderComponent/ShopOrderList';
import ConfirmDialog from '../Notification/ConfirmDialog';
import AlertNote from '../Notification/AlertNote';

const SiteUserDetail = (props) => {
    const { id } = useParams();
    const [siteUser, setSiteUser] = useState();
    const [orderStatus, setOrderStatus] = useState([]);
    const [orders, setOrders] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: "info" });
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle:"", commit: ()=>{}})
    
    useEffect(() => {
        props.setActbar("Users");
        SiteUserService.getSiteUserById(id).then(res => {
            setSiteUser(res.data);
        });
        ShopOrderService.getAllOrderStatus().then(response => {
            setOrderStatus(response.data);
        });
        getAllShopOrdersByUserId();
    }, []);

    function getAllShopOrdersByUserId(){
        ShopOrderService.getAllShopOrdersByUserId(id).then(res=>{
            setOrders(res.data);
        })
    }

    function processAddress(objAddresses) {
        let obj = objAddresses.filter(a => a.default);
        let objAddress = obj[0].address;
        let fa = objAddress.firstAddressLine;
        let sa = objAddress.secondAddressLine;
        let city = objAddress.city;
        let country = objAddress.country.name;
        return fa + ", " + sa + ", " + city + ", " + country;
    }

    function processPayment(objPayments){
        let obj = objPayments.filter(p => p.default);
        let objPay = obj[0].payment;
        return objPay.name;        
    }
    return (

        <div className='main-content'>
            {
                siteUser ?
                    <>
                        <div>
                            <h2 className="title-page"><span><Person className='icon' /> User Detail</span></h2>
                        </div>
                        <div>
                            <h5 className='label text-muted'><Person className='icon' /> User Info </h5>
                            <div className='info-field-container text-black'>
                                <div className='info-field'><BadgeRounded className='icon' /><span className='info-title'>Name</span> {siteUser.name}</div>
                                <div className='info-field'><Email className='icon' /> <span className='info-title'>Email</span> {siteUser.emailAddress}</div>
                            </div>
                            <div className='info-field-container text-black'>
                                <div className='info-field'><LocationOn className='icon' /> <span className='info-title'>Address</span> {processAddress(siteUser.addresses)}</div>
                            </div>
                            <div className='info-field-container text-black'>
                                <div className='info-field'><LocalPhone className='icon' /><span className='info-title'>Phone number</span> {siteUser.phoneNumber} </div>
                                <div className='info-field'><CreditCardRounded className='icon' /><span className='info-title'>Payment</span> {processPayment(siteUser.payments)}</div>
                            </div>
                        </div>
                        <div>
                            <h5 className='label text-muted'><ListAltRounded className='icon' /> Ordered </h5>
                            <div>
                                <OrdersContext.Provider value={{ orders: orders, setOrders: setOrders, setNotify: setNotify, setConfirmDialog: setConfirmDialog }}>
                                    <ShopOrderList goal='order-list' orders={orders} status={orderStatus} />
                                </OrdersContext.Provider>
                            </div>
                        </div>
                        <AlertNote notify={notify} setNotify={setNotify} />
                        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}></ConfirmDialog>
                    </>
                    :
                    <></>
            }
        </div>
    );
}

export default SiteUserDetail;
