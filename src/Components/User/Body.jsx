import React from 'react'
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
export default function Body() {
    return (
        <Container className='border border-dark rounded p-1 mt-1 mb-1'>
            <Advertisement></Advertisement>
            <SideBar></SideBar>
            <LazyComponent title="Laptop"></LazyComponent>
            <LazyComponent title="Linh kiện PC"></LazyComponent>
            <LazyComponent title="Có thể bạn quan tâm"></LazyComponent>
        </Container>
    )
}
