import React from 'react';
import { NavLink } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

const OrdersTable = (props) => {
    return (
        <div className='order-list'>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        props.todayOrders?.length > 0?
                        props.todayOrders?.map((order, index)=>
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{order.siteUser.name}</td>
                                <td className='price-color'>
                                {Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(order.orderTotal)}
                                </td>
                                <td>
                                    <NavLink to={"orders/"+order.id+"/detail"}><InfoIcon/></NavLink>
                                </td>
                            </tr>
                        ):
                        <tr>
                            <td colSpan={4} className='p-2'><span>We don't have any orders yet!</span></td>
                        </tr>
                    }
                    
                </tbody>
            </table>
            
        </div>
    );
}

export default OrdersTable;
