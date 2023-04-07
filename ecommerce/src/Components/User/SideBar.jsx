import React from 'react'
import { ListGroup, Nav, Tab, Tabs } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap"

import ProductCategoryService from '../../Services/CommonService/ProductCategoryService';
import { BluetoothSearching, Cable, Computer, Dashboard, Headset, Keyboard, Memory, Mouse, Storage } from '@mui/icons-material';

export default function SideBar() {
    const [key, setKey] = useState('first');
    const [categoryZero, setCategoryZero] = useState([])
    const [childOfCategorySelected, setChildOfCategorySelected] = useState([]);
    
    useEffect(() => {
        ProductCategoryService.getProductCategoryZeroLevel().then(res => {
            console.log(res.data);
            setCategoryZero(res.data);
        })
    }, []);

    function overOnCategory(catId) {
        ProductCategoryService.getChildrenOfProductCategory(catId).then(res => {
            console.log(res.data);
            setChildOfCategorySelected(res.data);
        })
    }

    function processIcon(id) {
        if (id === 1)
            return (<Cable />)
        if (id === 2)
            return (<BluetoothSearching />)
        if (id === 4)
            return (<Computer />)
        if (id === 100 || id === 200)
            return (<Headset />)
        if (id === 101 || id === 201)
            return (<Keyboard />)
        if (id === 102 || id === 202)
            return (<Mouse />)
        if (id === 300 || id === 400)
            return (<Memory />)
        if (id === 401 || id === 401)
            return (<Storage />)
        return (<Dashboard />)
    }

    return (
        <div onMouseLeave={() => setKey("")} className="ta-menu mt-1">
            <Tab.Container activeKey={key}>
                <Row>
                    <Col className='bg-white border rounded p-1 col-md-auto'>
                        <Nav variant='pills' className='ta-menu'>
                            {
                                categoryZero.map((cat, index) =>
                                    <Nav.Item key={index}>
                                        <Nav.Link eventKey={"cat_" + cat.id} onMouseOver={() => { setKey("cat_" + cat.id); overOnCategory(cat.id) }}>{processIcon(cat.id)} {cat.categoryName}</Nav.Link>
                                    </Nav.Item>
                                )
                            }
                        </Nav>
                    </Col>

                    <Col className='bg-dark rounded hidden'>
                        <Tab.Content className="mt-2 mb-2 bg-dark">
                            {
                                categoryZero.map((cat, index) =>
                                    <Tab.Pane key={index} eventKey={"cat_" + cat.id}>
                                        <Row className='ms-2'>
                                            {
                                                childOfCategorySelected.map((cc, index) =>
                                                    <Col key={index} className='first-child-category'>
                                                        <div className='btn btn-light' style={{ width: "100%", margin: "5px" }}>{processIcon(cc.id)} {cc.categoryName}</div>
                                                    </Col>)
                                            }
                                        </Row>
                                    </Tab.Pane>
                                )
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}
