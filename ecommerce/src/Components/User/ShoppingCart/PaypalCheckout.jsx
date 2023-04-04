import React, {useState, useEffect} from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const PaypalCheckout = (props) => {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const handleApprove = (orderId) => {
        setPaidFor(true);
        props.afterPay();
    }

    if(paidFor)
        console.log("Thank you your purchase");

    if(error){
        console.log(error);
    }
        
    return (
        <div style={{maxWidth: "150px"}} className='paypal'>
            <PayPalButtons 
            style={{
                color: "silver",
                height: 48,
                tagline: false,
                shape: "pill"
            }}

            onClick ={(data, actions)=>{
                const hasAlreadyBoughtCourse = false;
                if(hasAlreadyBoughtCourse){
                    setError("You already bought course");
                    return actions.reject;
                } else {
                    return actions.resolve;
                }

            }}

            createOrder={(value, actions)=>{
                return actions.order.create({
                    purchase_units: [
                        {
                            description: props.description,
                            amount: {
                                value: props.getPrice()
                            }
                        }
                    ]
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log("order", order);
                handleApprove(data.orderID);
            }} 
            
            onError={(err)=>{
                setError(err);
            }}

            onCancel={()=>{
                console.log("Cancel");
            }}
            />
        </div>
    );
}

export default PaypalCheckout;
