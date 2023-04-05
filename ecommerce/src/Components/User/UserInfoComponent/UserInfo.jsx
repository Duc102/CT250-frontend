import { BadgeRounded, CreditCardRounded, Email, Home, ListAltRounded, LocalPhone, LocationCity, LocationOn, Person, Public } from '@mui/icons-material';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';
import ShopOrderList from '../../Administrator/ShopOrderComponent/ShopOrderList';
import OrdersContext from '../../Administrator/ShopOrderComponent/OrdersContext';
import AlertNote from '../../Administrator/Notification/AlertNote';
import ConfirmDialog from '../../Administrator/Notification/ConfirmDialog';

const UserInfo = () => {
    const context = useContext(UserContext);
    const [siteUser, setSiteUser] = useState({ ...context.siteUser });
    const [orderStatus, setOrderStatus] = useState([]);
    const [orders, setOrders] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: "info" });
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle:"", commit: ()=>{}})
    
    
    useEffect(() => {
        if(context.siteUser.id)
            getAllShopOrdersByUserId(context.siteUser.id);
        ShopOrderService.getAllOrderStatus().then(response => {
            setOrderStatus(response.data);
        });
        setSiteUser({ ...context.siteUser });
    }, [context.siteUser])

    function getAllShopOrdersByUserId(id){
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

    function processPayment(objPayments) {
        let obj = objPayments.filter(p => p.default);
        let objPay = obj[0].payment;
        return objPay.id;
    }

    function changeSomething(event, name) {
        let value = event.currentTarget.value;
        siteUser[name] = value;
        setSiteUser({ ...siteUser });
    }

    function changeAddress(event, name) {
        let value = event.currentTarget.value;
        let address = defaultAddress(siteUser.addresses);
        address[name] = value;
        setSiteUser({ ...siteUser });
    }

    function defaultAddress(addresses) {
        let addressAss = addresses.filter(a => a.default);
        addressAss = addressAss[0];
        return addressAss.address;
    }

    useEffect(() => {
        console.log("Change function", siteUser);
    }, [siteUser])

    return (
        <div className="container border border-dark rounded mt-1 mb-1 bg-dark" style={{ minWidth: "450px" }}>
            <div>
                <h2 className="title-page text-center"><span><Person className='icon' />User Infomation</span></h2>
            </div>
            {
                siteUser.id !== 0 ?
                    <div>
                        <h5 className='label text-muted'><Person className='icon' /> User Info </h5>
                        <div className='info-field-container text-black' style={{ flexWrap: 'wrap' }}>
                            <div className='info-field'><BadgeRounded className='icon' /><span className='info-title'>Name</span> <input value={siteUser.name} onChange={(event) => changeSomething(event, "name")}></input></div>
                            <div className='info-field'><Email className='icon' /> <span className='info-title'>Email</span> <input value={siteUser.emailAddress} onChange={(event) => changeSomething(event, "emailAddress")}></input></div>
                        </div>
                        <div className='info-field-container text-black' style={{ flexWrap: 'wrap' }} >
                            <div className='info-field'><Home className='icon' /> <span className='info-title'>First line</span> <input value={defaultAddress(siteUser.addresses).firstAddressLine} onChange={(event) => changeAddress(event, "firstAddressLine")}></input></div>
                            <div className='info-field'><LocationOn className='icon' /> <span className='info-title'>Seconde line</span> <input value={defaultAddress(siteUser.addresses).secondAddressLine} onChange={(event) => changeAddress(event, "secondAddressLine")}></input></div>
                            <div className='info-field'><LocationCity className='icon' /> <span className='info-title'>City</span> <input value={defaultAddress(siteUser.addresses).city} onChange={(event) => changeAddress(event, "city")}></input></div>
                            <div className='info-field'><Public className='icon' /> <span className='info-title'>Country</span> {defaultAddress(siteUser.addresses).country.name}</div>
                        </div>
                        <div className='info-field-container text-black' style={{ flexWrap: 'wrap' }}>
                            <div className='info-field'><LocalPhone className='icon' /><span className='info-title'>Phone number</span> <input value={siteUser.phoneNumber} onChange={(event) => changeSomething(event, "phoneNumber")}></input></div>
                            <div className='info-field'><CreditCardRounded className='icon' /><span className='info-title'>Default Payment</span>
                                <select value={processPayment(siteUser.payments)} style={{ border: 'none' }} onChange={()=>{}}>
                                    {
                                        siteUser.payments.map((p, index) => <option key={index} value={p.payment.id}>{p.payment.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div>
                            <h5 className='label text-muted'><ListAltRounded className='icon' />Order History</h5>
                            <div>
                                <OrdersContext.Provider value={{ orders: orders, setOrders: setOrders, setNotify: setNotify, setConfirmDialog: setConfirmDialog }}>
                                    <ShopOrderList goal='view-order-list' orders={orders} status={orderStatus} />
                                </OrdersContext.Provider>
                            </div>
                        </div>
                        <AlertNote notify={notify} setNotify={setNotify} />
                        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}></ConfirmDialog>
                    </div>
                    : <></>
            }

        </div>
    );
}

export default UserInfo;
