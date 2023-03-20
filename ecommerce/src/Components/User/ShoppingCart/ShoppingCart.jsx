import React from 'react'
import { Container } from 'react-bootstrap'
import ShoppingCartService from '../../../Services/CommonService/ShoppingCartService'

export default function ShoppingCart() {

  function func(){
    ShoppingCartService.getShopingCartById(1).then(response=>{
      console.log(response.data);
    })
  }
  return (
    <Container className='border border-dark rounded p-1 mt-1 mb-1'>
            <button onClick={func}>Click Me</button>
    </Container>
  )
}
