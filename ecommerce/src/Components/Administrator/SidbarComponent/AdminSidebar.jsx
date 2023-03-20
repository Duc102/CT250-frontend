import React from 'react'
import Logo from "../../User/Images/logo.png"
import { useState } from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AddProduct from '@mui/icons-material/AddToPhotos';
import UserIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Order from '@mui/icons-material/Mail';
import ProductsIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

import "./AdminSidebar.css"
import { NavLink } from 'react-router-dom';
export default function AdminSidbar() {
  const [menuData, setMenuData] = useState({
    Dashboard: "active",
    Products: "",
    AddProduct: "",
    Category: "",
    Orders: "",
    Users: ""}
  )
  const [sidebarClass, setSidebarClass] =useState("sidebar");

  function clickOnToggleButton(){
    if(sidebarClass.includes("close")){
      setSidebarClass("sidebar");
    } else {
      setSidebarClass(sidebarClass+" close");
    }
  }
  function activeLink(name){
    const newActiveData = {
      Dashboard: "",
      Products: "",
      AddProduct: "",
      Category: "",
      Orders: "",
      Users: ""
    };
    newActiveData[name] = "active";
    setMenuData(newActiveData);
  }
  return (
    <nav className={sidebarClass}>
        <header>
            <span className="image"><img src={Logo} alt="logo"></img></span>
            <KeyboardArrowRightIcon className='toggle' onClick={clickOnToggleButton}/>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <div className='search-box'>
              <span className="icon"><SearchIcon style={{color: "white"}}/></span>
              <input type="search" placeholder='Search ...'></input>
            </div>
            <ul className='menu-links'>
              <NavLink to="/administrator">
                <li className={'nav-link '+menuData.Dashboard} onClick={()=>activeLink("Dashboard") }>
                <HomeIcon className="icon"/> 
                <span className="text"> Dashboard</span>  
                </li>
              </NavLink>

              <NavLink to="/administrator/products">
                <li className={'nav-link '+menuData.Products} onClick={()=>activeLink("Products")}>
                <ProductsIcon className="icon"/>
                <span className="text"> Products</span>
                </li>
              </NavLink>

              <NavLink to="/administrator/addProduct">
                <li className={'nav-link '+menuData.AddProduct} onClick={()=>activeLink("AddProduct")}>
                <AddProduct className="icon"/>
                <span className="text">Add products</span>
                </li>
              </NavLink>

              <NavLink to="/administrator">
                <li className={'nav-link ' + menuData.Category} onClick={()=>activeLink("Category")}>
                <CategoryIcon className="icon"/>
                <span className="text"> Categories</span>
                </li>
              </NavLink>

              <NavLink to="/administrator/orders">
                <li className={'nav-link ' + menuData.Orders} onClick={()=>activeLink("Orders")}>
                <ListAltRoundedIcon className="icon"/>
                <span className="text">Orders</span>
                </li>
              </NavLink>

              <NavLink to="/administrator">
                <li className={'nav-link ' + menuData.Users} onClick={()=>activeLink("Users")}>
                <UserIcon className="icon"/>
                <span className="text"> Users</span>
                </li>
              </NavLink>
            </ul>
          </div>
          <div className="bottom">
            <NavLink to="/login">
              <div className='logout'>
                <LogoutIcon className='icon'></LogoutIcon>
                <span className="text">Logout</span>
              </div>
            </NavLink>
          </div>
        </div>
    </nav>
  )
}
