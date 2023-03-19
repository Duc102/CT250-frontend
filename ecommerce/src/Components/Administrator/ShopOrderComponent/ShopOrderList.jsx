import React from 'react';
import { useState } from 'react';
import "./ShopOrder.css"
import ShopOrderLine from './ShopOrderLine';
const ShopOrderList = (props) => {

    return (
        <div className='order-list'>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        props.orders.map((order, index) =>
                            <ShopOrderLine key={index} order={order} status={props.status} />
                        )
                    }
                </tbody>

            </table>

        </div>
    );
}

export default ShopOrderList;
