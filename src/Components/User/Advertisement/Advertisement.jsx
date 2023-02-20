import React from 'react'
import { Carousel } from 'react-bootstrap'
import AdOne from "./Images/discount.webp"
import AdTwo from "./Images/discount_01.webp"
import AdThree from "./Images/discount_02.webp"

export default function Advertisement() {
  return (
    <div>
        <Carousel>
            <Carousel.Item>
                <img
                    className='d-block w-100' 
                    src={AdOne}
                    alt='First slide'>
                </img>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src = {AdTwo}
                    alt='Second slide'>
                </img>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src = {AdThree}
                    alt='Third slide'>
                </img>
            </Carousel.Item>
        </Carousel>
    </div>
  )
}
