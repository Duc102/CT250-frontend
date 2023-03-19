import React from 'react';
import { useState, useEffect } from 'react';
import "./ShopOrder.css"
import ShopOrderLine from './ShopOrderLine';
const ShopOrderList = (props) => {
    const [orderList, setOrderList] = useState(props.orders);

    useEffect(()=>{
        setOrderList(props.orders);
    },[props])
    
    return (
        <div className='order-list'>
            <table>
                <thead>
                    <tr>
                        <th>No. ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orderList.map((order, index) =>
                            <ShopOrderLine key={index} order={order} status={props.status} />
                        )
                    }
                </tbody>

            </table>

        </div>
    );
}

export default ShopOrderList;
