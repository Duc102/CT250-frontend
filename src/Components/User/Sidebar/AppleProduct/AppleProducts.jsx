import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'

import iPhoneIcon from './Images/iPhoneLogo.png'
import iPadIcon from "./Images/iPadIcon.png"
import airPodIcon from "./Images/airpodIcon.png"
import chargeIcon from "./Images/chargeIcon.png"
import iMacIcon from "./Images/iMacIcon.png"
import watchIcon from "./Images/watchIcon.png"
import mouseIcon from "./Images/mouseIcon.png"
import appleTVIcon from "./Images/appleTVIcon.png"
import macbookIcon from "./Images/macbookIcon.png"
export default function AppleProducts() {
    const macbooks = [{name: "Air", image: macbookIcon},{name: "Pro", image: macbookIcon}];
    const iMacs = [{name: "Mini", image: iMacIcon}];
    const iPhonePads = [{name: "iPhone", image: iPhoneIcon}, {name: "iPad", image: iPadIcon}]
    const appleAss = [
        {name: "Apple Watch", image: watchIcon},
        {name: "Củ sạc & cáp sạc", image: chargeIcon}, 
        {name: "Tai nghe Airpods", image: airPodIcon},
        {name: "Bàn phím, chuột và bút", image: mouseIcon},
        {name: "Apple TV", image: appleTVIcon}
        ]
    return (
    <Row className='ms-2'>
        <Col>
            <h5 className='text-center text-danger'>Macbook</h5>
            <ListGroup>
                {
                    macbooks.map((macbook, index)=><ListGroup.Item key={index}><div className='bg-white'><img src={macbook.image}></img> Macbook {macbook.name}</div></ListGroup.Item>)
                }
            </ListGroup>
        </Col>

        <Col>
            <h5 className='text-center text-danger'>iMac</h5>
            <ListGroup>
                {
                    iMacs.map((iMac, index)=><ListGroup.Item key={index}><div className='bg-white'><img src={iMac.image}></img> iMac {iMac.name}</div></ListGroup.Item>)
                }
            </ListGroup>
        </Col>

        <Col>
            <h5 className='text-center text-danger'>iPhone&iPad</h5>
            <ListGroup>
                {
                    iPhonePads.map((phone, index)=><ListGroup.Item key={index}><div className='bg-white'><img src={phone.image}></img> {phone.name}</div></ListGroup.Item>)
                }
            </ListGroup>
        </Col>

        <Col>
            <h5 className='text-center text-danger'>Phụ kiện</h5>
            <ListGroup>
                {
                    appleAss.map((ass, index)=><ListGroup.Item key={index}><div className='bg-white'><img src={ass.image}></img> {ass.name}</div> </ListGroup.Item>)
                }
            </ListGroup>
        </Col>
    </Row>
  )
}
