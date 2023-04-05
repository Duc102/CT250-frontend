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
                        <th>No</th>
                        <th>Or's ID</th>
                        <th>Date</th>
                        {
                            props.goal === 'customer-order-list'
                            ?<th>Customer</th>
                            :<></>
                        }
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orderList.length > 0?
                        orderList.map((order, index) =>
                            <ShopOrderLine goal={props.goal} key={index} no={index+1} order={order} status={props.status} />
                        )
                        :<tr>
                            <td colSpan={6} className="p-2">We don't have any orders like that</td>
                        </tr>
                    }
                </tbody>

            </table>

        </div>
    );
}

export default ShopOrderList;
