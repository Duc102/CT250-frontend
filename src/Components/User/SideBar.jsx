import React from 'react'
import { ListGroup, Nav, Tab, Tabs } from 'react-bootstrap'
import { useState } from 'react';
import {Col, Row} from "react-bootstrap"
import LaptopIcon from '@mui/icons-material/Laptop';
import AppleIcon from '@mui/icons-material/Apple';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import TvIcon from '@mui/icons-material/Tv';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import UsbIcon from '@mui/icons-material/Usb';
import SpeakerIcon from '@mui/icons-material/Speaker';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PrintIcon from '@mui/icons-material/Print';

import Apple from "./Images/logo-macbook.png"
import Acer from "./Images/logo-acer.png"
import Asus from "./Images/logo-asus.png"
import Dell from "./Images/logo-dell.png"
import HP from "./Images/logo-hp.png"
import Lenovo from "./Images/logo-lenovo.png"
import LG from "./Images/logo-lg.png"
import MSI from "./Images/logo-msi.png"
import Gigabyte from "./Images/logo-gigabyte.png"

import AMDCore from "./Images/amdLogo.png"
import IntelLogo from "./Images/intelLogo.png"
import RamIcon from "./Images/ramIcon.png"
import AppleProducts from './Sidebar/AppleProduct/AppleProducts';
import { type } from '@testing-library/user-event/dist/type';
import { positions } from '@mui/system';

import Advertisement from './Advertisement/Advertisement';

export default function SideBar () {
  const [key, setKey] = useState('first');
  const brands = [{name: "Apple", image: Apple}, 
  {name: "Acer", image: Acer}, 
  {name: "ASUS", image: Asus}, 
  {name: "Dell", image: Dell}, 
  {name: "HP", image: HP}, 
  {name: "Lenovo", image: Lenovo},
  {name: "LG", image: LG},
  {name: "MSI", image: MSI}, 
  {name: "Gigabyte", image: Gigabyte}];
  
  const cpus =[
    {
        name: "Core",
        image: IntelLogo,
        option: ["Pentium","i3", "i5", "i7", "i9"]
    },
    {
        name: "Ryzen",
        image: AMDCore,
        option: ["3", "5", "7"]
    }
  ];

  const rams = [
    {
        size: [2, 4, 8, 16],
        unit: "GB"
    }
  ]
  
    return (
    <div onMouseLeave={()=>setKey("")} className="ta-menu">

        <Tab.Container activeKey={key}>
            <Row>
                <Col className='bg-white border rounded p-1 col-md-auto'>
                    <Nav variant='pills' className='ta-menu'>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_1" onMouseOver={()=>{setKey("cat_1")}}><LaptopIcon/> Laptop</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_2" onMouseOver={()=>{setKey("cat_2")}}><AppleIcon/> Sản phẩm Apple</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_3" onMouseOver={()=>{setKey("cat_3")}}><DesktopWindowsIcon/> PC - Máy bộ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_4" onMouseOver={()=>{setKey("cat_4")}}><TvIcon/> PC - Màn hình máy tính</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_5" onMouseOver={()=>{setKey("cat_5")}}><DashboardIcon/> PC - Linh kiện máy tính</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_6" onMouseOver={()=>{setKey("cat_6")}}><KeyboardIcon/> PC - Phụ kiện</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_7" onMouseOver={()=>{setKey("cat_7")}}><SportsEsportsIcon/> Game & Stream</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_8" onMouseOver={()=>{setKey("cat_8")}}><PhoneAndroidIcon/> Điện thoại & Phụ kiện</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_9" onMouseOver={()=>{setKey("cat_9")}}><UsbIcon/> Phụ kiện</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_10" onMouseOver={()=>{setKey("cat_10")}}><SpeakerIcon/> Thiết bị âm thanh</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_11" onMouseOver={()=>{setKey("cat_11")}}><PsychologyIcon/> Thiết bị thông minh</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cat_12" onMouseOver={()=>{setKey("cat_12")}}><PrintIcon/> Thiết bị văn phòng</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>

                <Col>
                    <Tab.Content className="mt-3">
                        <Tab.Pane eventKey="cat_1">
                            <Row className='ms-2'>
                                <Col>
                                    <h5 className='text-center text-danger'>Thương hiệu</h5>
                                    <ListGroup>
                                        {
                                            brands.map((brand, index)=><ListGroup.Item key={index}><div className='text-center bg-white'><img src={brand.image} style={{borderRadius: "35px"}} className="brand"></img></div></ListGroup.Item>)
                                        }
                                    </ListGroup>
                                </Col>

                                <Col>
                                    <h5 className='text-center text-danger'>CPU</h5>
                                    <ListGroup>
                                        {
                                            cpus.map((cpu, index)=>
                                                cpu.option.map((option, index)=>
                                                    <ListGroup.Item key={index}><div className="bg-white core"><img src={cpu.image} ></img> {cpu.name} {option}</div></ListGroup.Item>
                                                )
                                        )
                                        }
                                    </ListGroup>
                                </Col>

                                <Col>
                                    <h5 className='text-center text-danger'>RAM</h5>
                                    <ListGroup>
                                        {
                                            rams.map((ram, index)=>
                                            ram.size.map((size, index)=><ListGroup.Item key={index}><div className='bg-white ram'><img src={RamIcon}></img> {size} {ram.unit}</div></ListGroup.Item>))
                                        }
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_2">
                            <AppleProducts></AppleProducts>
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_3">
                            PC - Máy bộ
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_4">
                            PC - Màn hình máy tính     
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_5">
                            PC - Linh kiện máy tính
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_6">
                            PC - Phụ kiện
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_7">
                            Game & Tream
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_8">
                            Điện thoại & Phụ kiện
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_9">
                            Phụ kiện
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_10">
                            Thiết bị âm thanh
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_11">
                            Thiết bị thông minh
                        </Tab.Pane>
                        <Tab.Pane eventKey="cat_12">
                            Thiết bị thông minh
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </div>
  )
}
