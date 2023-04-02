import React from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import ShoppingCartService from '../../../Services/CommonService/ShoppingCartService'
import ShopOrderService from '../../../Services/CommonService/ShopOrderService'
import ProductItemLine from './ProductItemLine'
import "./ShoppingCart.css"
import UserContext from '../UserContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default function ShoppingCart() {

  const context = useContext(UserContext);

  const siteUser = context.siteUser;
  const shoppingCart = context.shoppingCart;

  function pay() {
    ShopOrderService.createNewShopOders(siteUser, shoppingCart.shoppingCartItems, siteUser.addresses[0].address).then(response => {
      console.log(response.data);
    });
  }

  function totalPay(){
    let price = 0;
    shoppingCart.shoppingCartItems?.forEach(line => {
      price += line.qty * line.productItem.price;
    });
    return price;
  }

  function howManyProductItems(){
    let howMany = 0;
    shoppingCart.shoppingCartItems?.forEach(line => {
      howMany += line.qty;
    });
    return howMany;
  }

  return (
    <Container className='border border-dark rounded p-1 mt-1 mb-1' style={{ backgroundColor: "#212529" }}>
      <div>
        <h2 className="title-page"><span><ShoppingCartIcon className='icon' />Orders</span></h2>
      </div>
      <div className='order-list'>
        <table className='shopping-cart-table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              shoppingCart.shoppingCartItems?.map((productItem, index) => <ProductItemLine key={index} no={index} productLine={productItem} cartId={shoppingCart.id} />)
            }
          </tbody>
          <tfoot>
            <tr>
              <td className='p-2 fw-bold'> Number </td>
              <td className='p-2 fst-italic' colSpan={2}> {howManyProductItems()} product item (s)</td>
              <td className='p-2 fw-bold'> Total </td>
              <td className='price-color p-2' colSpan={2} >{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(totalPay())}</td>
              <td className='p-2'><button className="btn btn-success" onClick={pay}>Pay</button></td>
            </tr>
          </tfoot>
        </table>
      </div>
      
    </Container>
  )
}
