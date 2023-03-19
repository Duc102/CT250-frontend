import React from 'react';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShopOrderService from '../../../Services/CommonService/ShopOrderService';
import InfoIcon from '@mui/icons-material/Info';

const ShopOrderLine = (props) => {
    const [order, setOrders] = useState(props.order);

    useEffect(()=>{
        setOrders(props.order);
    },[props])

    function processDate(dateTime){
        let MonthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(dateTime);
        let result = date.getDate() +" "+ MonthsOfYear[date.getMonth()] + " " + date.getFullYear();
        return result;
    }

    function changeOrderStatus(event){
        let select = event.currentTarget.value;
        let status = props.status.filter(st=> parseInt(st.id) === parseInt(select));
        setOrders({...order, orderStatus: status[0]});
    }

    function quickUpdateOrderStatus(){
        ShopOrderService.updateShopOrderStatus(order.id, order.orderStatus.id).then(response=>{
            console.log(response.data);
        });
    }

    return (
        <tr>
            <td style={{ textAlign: "center" }}>{order.id}</td>
            <td style={{ textAlign: "center" }}>{processDate(order.dateCreate)}</td>
            <td style={{ textAlign: "center" }}>{order.siteUser.name}</td>
            <td style={{ textAlign: "center" }}>
                <select className={'status-color-'+order.orderStatus.id} id={"order-status-" + order.id} value={order.orderStatus.id} onChange={(event) => changeOrderStatus(event)}>
                    {
                        props.status.map((st, index) =>
                            <option key={index} value={st.id}>{st.status}</option>
                        )
                    }
                </select>
            </td>
            <td>
                {Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(order.orderTotal)}
            </td>
            <td style={{ textAlign: "center" }} className='m-1'>
                <div>
                    <button className='btn text-success' title='Confirm' onClick={quickUpdateOrderStatus}><CloudUploadIcon/></button>
                    <button className='btn text-light' title='Info' onClick={()=>{}}><InfoIcon/></button>
                    <button className='btn text-danger' title='Delete'><DeleteIcon/></button>
                </div>
                
            </td>
        </tr>
    );
}

export default ShopOrderLine;
