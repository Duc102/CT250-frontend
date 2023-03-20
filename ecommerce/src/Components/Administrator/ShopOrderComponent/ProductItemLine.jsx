import React from 'react';

const ProductItemLine = (props) => {

    function calSum(){
       return props.productLine.productItem.price * props.productLine.qty
    }
    return (
        <tr>
            <td className='text-center'>{props.no+1}</td>
            <td className='text-center'>
                <img src={props.productLine.productItem.productImages[0].url} width="100px"></img>
            </td>
            <td className='text-center'>Product name</td>
            <td className='text-center price-color'>
            {Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(props.productLine.productItem.price)}
            </td>
            <td className='text-center'>{props.productLine.qty}</td>
            <td className='text-center price-color'>
                {Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(calSum())}
            </td>
        </tr>
    );
}

export default ProductItemLine;
