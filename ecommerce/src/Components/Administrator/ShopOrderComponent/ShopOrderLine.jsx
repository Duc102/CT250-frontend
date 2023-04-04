import React from 'react';
import { useState, useEffect, useContext, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import ShopOrderService from '../../../Services/CommonService/ShopOrderService';
import OrdersContext from './OrdersContext';

import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoIcon from '@mui/icons-material/Info';

const ShopOrderLine = (props) => {
    const [order, setOrder] = useState(props.order);
    const context = useContext(OrdersContext);
    const orders = context.orders;
    const updateOrders = context.setOrders;
    const setNotify = context.setNotify;
    const setConfirmDialog = context.setConfirmDialog;

    const navigate = useNavigate();
    useEffect(() => {
        setOrder(props.order);
    }, [props])

    function processDate(dateTime) {
        let MonthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(dateTime);
        let result = date.getDate() + " " + MonthsOfYear[date.getMonth()] + " " + date.getFullYear();
        return result;
    }

    function changeOrderStatus(event) {
        let select = event.currentTarget.value;
        let status = props.status.filter(st => parseInt(st.id) === parseInt(select));
        setOrder({ ...order, orderStatus: status[0] });
    }

    function quickUpdateOrderStatus() {
        ShopOrderService.updateShopOrderStatus(order.id, order.orderStatus.id).then(response => {
            console.log(response.data);
            setNotify({ isOpen: true, message: "Update successful!", type: "success" })
        });
    }

    function goToDetail() {
        navigate(order.id + "/detail");
    }

    function deleteShopOder() {
        setConfirmDialog({
            isOpen: true,
            title: "Are you sure delete this record?",
            subTitle: "You can't undo this operation.",
            commit: () => {
                ShopOrderService.deleteShopOrder(order.id).then(response => {
                    console.log("Delete Result: ", response.data);
                })
                let ls = orders;
                let el = ls.filter(or => or.id === order.id);
                let index = ls.indexOf(el[0]);
                ls.splice(index, 1);
                updateOrders([...ls]);
            }
        });
    }

    return (
        <tr>
            <td style={{ textAlign: "center" }}>{order.id}</td>
            <td style={{ textAlign: "center" }}>{processDate(order.dateCreate)}</td>
            <td style={{ textAlign: "center" }}>{order.siteUser.name}</td>
            <td style={{ textAlign: "center" }}>
                <select className={'status-color-' + order.orderStatus.id} id={"order-status-" + order.id} value={order.orderStatus.id} onChange={(event) => changeOrderStatus(event)}>
                    {
                        props.status.map((st, index) =>
                            <option key={index} value={st.id}>{st.status}</option>
                        )
                    }
                </select>
            </td>
            <td className='price-color'>
                {Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(order.orderTotal)}
            </td>
            <td style={{ textAlign: "center" }} className='m-1'>
                <div>
                    <button className='btn text-success' title='Confirm' onClick={quickUpdateOrderStatus}><CloudUploadIcon /></button>
                    <button className='btn' style={{ color: "#0d6efd" }} title='Info' onClick={goToDetail}><InfoIcon /></button>
                    <button className='btn text-danger' title='Delete' onClick={deleteShopOder}><DeleteIcon /></button>
                </div>

            </td>
        </tr>
    );
}

export default memo(ShopOrderLine);
