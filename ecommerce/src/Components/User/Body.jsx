import React from 'react'
import { useEffect, useState } from 'react'
import {
    Container,
    Button,
    Row,
    Col,
    Alert,
    Breadcrumb,
    Card,
    Form
} from 'react-bootstrap'
import Advertisement from './Advertisement/Advertisement'
import LazyComponent from './LazyComponent/LazyComponent'
import ShopOrderService from '../../Services/CommonService/ShopOrderService';
import SideBar from './SideBar'
export default function Body(props) {
    
    const [topTens, setTopTens] = useState();
    useEffect(()=>{
        console.log("This is user: ", props.user)
        let dateTime = new Date();
        getTopTen(parseInt(dateTime.getMonth())+1, parseInt(dateTime.getFullYear()));
    },[props])

    function getTopTen(month, year) {
        ShopOrderService.getTopTenProductItems(month, year).then(res => {
            let topFive = [];
            for (let i = 0; i < 5 && i < res.data.length; i++) {
                let e = res.data[i];
                    
                topFive.push(e);
            }
            setTopTens(topFive);
        });
    }

    return (
        <Container className='border border-dark rounded p-1 mt-1 mb-1'>
            <Advertisement></Advertisement>
            <SideBar></SideBar>
            <LazyComponent title="Top Selling Product" productItems={topTens}></LazyComponent>
            <LazyComponent title="PC Components" category={3}></LazyComponent>
            <LazyComponent title="Wired Peripherals" category={1}></LazyComponent>
        </Container>
    )
}
