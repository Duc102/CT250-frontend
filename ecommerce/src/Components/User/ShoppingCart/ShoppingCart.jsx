import React from 'react'
import {useContext} from 'react'
import { Container } from 'react-bootstrap'
import ShoppingCartService from '../../../Services/CommonService/ShoppingCartService'
import ShopOrderService from '../../../Services/CommonService/ShopOrderService'
import ProductItemLine from './ProductItemLine'
import "./ShoppingCart.css"
import UserContext from '../UserContext'

export default function ShoppingCart() {
  
  const context = useContext(UserContext);
  
  const siteUser = context.siteUser;
  const shoppingCart = context.shoppingCart;

  function pay(){
    ShopOrderService.createNewShopOders(siteUser, shoppingCart.shoppingCartItems, siteUser.addresses[0].address).then(response=>{
      console.log(response.data);
    });
  }
  
  return (
    <Container className='border border-dark rounded p-1 mt-1 mb-1'>

            <table className='shopping-cart-table'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Sum</th>
                </tr>
              </thead>
              <tbody>
                {
                  shoppingCart.shoppingCartItems?.map((productItem, index) => <ProductItemLine key={index} no={index} productLine={productItem} cartId={shoppingCart.id} />)
                }
              </tbody>
            </table>
            <button onClick={pay}>Pay</button>
    </Container>
  )
}
