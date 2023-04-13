import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import Bill from './Bill';
import AlertNote from "../Notification/AlertNote"
import ConfirmDialog from '../Notification/ConfirmDialog';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const ShopOrderDetail = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState();
    const originOrder = useRef({});
    const [orderStatus, setOrderStatus] = useState([]);
    const [modifyMode, setModifyCode] = useState(true);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "info" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "", commit: () => { } });
    useEffect(() => {
        if (props.setActbar)
            props.setActbar("Orders");
        ShopOrderService.getShopOrderById(id).then(response => {
            setOrder(response.data);
            originOrder.current = { ...response.data };
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

    function processPaid() {
        if (order.orderStatus.id === 7 || order.payment.id === 2)
            return order.orderTotal;
        else
            return 0
    }

    function changeOrderStatus(event) {
        let select = event.currentTarget.value;
        let status = orderStatus.filter(st => parseInt(st.id) === parseInt(select));
        setOrder({ ...order, orderStatus: status[0] });
        if (modifyMode) {
            onModifyMode();
        }
    }

    function updateOrderStatus() {
        ShopOrderService.updateShopOrderStatus(order.id, order.orderStatus.id).then(response => {
            console.log("Update Result: ", response.data);
        });
        if (!modifyMode) {
            offModifyMode();
        }
        setNotify({ isOpen: true, message: "Update successful!", type: "success" });

    }

    function deleteShopOrder() {
        setConfirmDialog({
            isOpen: true,
            title: "Are you sure delete this order?",
            subTitle: "You can't undo this operation.",
            commit: () => {
                ShopOrderService.deleteShopOrder(order.id).then(response => {
                    console.log("Delete Result: ", response.data);
                    navigate("/administrator/orders");
                })
            }
        });
    }

    function cancel() {
        setOrder({ ...originOrder.current });
        if (!modifyMode)
            offModifyMode();
    }

    function disabled(i) {
        if (props.role) {
            return false;
        } else {
            let howLong = 0;
            let now = new Date().getTime();
            let past = new Date(order.dateCreate).getTime();
            howLong = now - past;
            if (howLong < 60 * 60 * 24 * 1000 && (i === 7 || i === 9))
                return false;
            else if (i == order.orderStatus.id)
                return false;
            else
                return true;
        }
    }

    function onModifyMode() {
        setModifyCode(false);
    }


    function offModifyMode() {
        setModifyCode(true);
    }


    if (order)
        return (
            <div className="main-content order-detail text-white">
                <div>
                    <h2 className="title-page" style={props.role ? {} : { marginTop: "-5px" }}><span><ListAltRoundedIcon className='icon' />Order Number {order.id}</span></h2>
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
                        <div className='info-field'><CreditCardRoundedIcon className='icon' /><span className='info-title'>Payment</span> {order.payment.name}</div>
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
                                        disabled(st.id) ? '' :
                                            <option key={index} value={st.id}>{st.status}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <h5 className='label text-muted'><ProductsIcon className='icon' /> Products</h5>
                <div className='order-list'>
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
                </div>
                <div className='info-field-container text-black'>
                    <div className='info-field'><LocalAtmRoundedIcon className="icon text-success" /><span className='info-title'>Total</span> <span className='price-color'>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(order.orderTotal)}</span></div>
                    <div className='info-field'><PriceCheckRoundedIcon className="icon text-success" /><span className='info-title'>Paid</span> <span className='price-color'>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(processPaid())}</span></div>
                </div>
                {/* <div>
                    <PDFViewer>
                        <Bill order={order}></Bill>
                    </PDFViewer>
                </div> */}

                <div className='commit d-flex'>
                    <div>
                        {
                            props.role ?
                                <>
                                    <PDFDownloadLink className='btn btn-success flex-grow-1 m-1' document={<Bill order={order} />} fileName={"bill_" + order.id}>
                                        {({ loading }) => (loading ? "Loadding Bill ..." : "Export Bill")}
                                    </PDFDownloadLink>

                                </>
                                : <></>
                        }
                        <button className='btn btn-dark border border-danger flex-grow-1 m-1' disabled={modifyMode} onClick={updateOrderStatus}>Save</button>
                        <button className='btn btn-dark border border-danger flex-grow-1 m-1 me-0' disabled={modifyMode} onClick={cancel}>Cancel</button>
                        <button className='btn btn-danger border border-danger flex-grow-1 m-1' onClick={deleteShopOrder}>Delete</button>
                    </div>
                </div>
                <AlertNote notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}></ConfirmDialog>
            </div>
        );
    else return <></>
}

export default ShopOrderDetail;
