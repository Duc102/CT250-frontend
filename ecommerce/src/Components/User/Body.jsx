import React from 'react'
import { useEffect } from 'react'
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
import SideBar from './SideBar'
export default function Body(props) {
    
    useEffect(()=>{
        console.log("This is user: ", props.user)
    },[props])

    return (
        <Container className='border border-dark rounded p-1 mt-1 mb-1'>
            <Advertisement></Advertisement>
            <SideBar></SideBar>
            <h1>This is user: {props.user.name}</h1>
            <LazyComponent title="Laptop"></LazyComponent>
            <LazyComponent title="Linh kiện PC" category={3}></LazyComponent>
            <LazyComponent title="Có thể bạn quan tâm"></LazyComponent>
        </Container>
    )
}
