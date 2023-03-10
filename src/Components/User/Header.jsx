import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "./Images/logo.png"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import {Button} from "react-bootstrap"
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
export default function Header() {
  const submit = (event) => {
    event.preventDefault();
  }

  return (
    <>
    <style type='text/css'>
        {
          `
          .btn-flat {
            background-color: purple;
            color: white;
          }
          .btn-xxl {
            padding: 1rem 1.5rem;
            font-size: 1.5rem;
          }
          .btn-flat:hover {
            background-color: red;
            color: white;
          }
          .btn-flat:focus {
            background-color: transparent;
            color: black;
            border: 1px solid black;
          }
          `
        }
    </style>
    <header className='container sticky-top rounded-bottom border border-dark'>
      <nav className='navbar navbar-expand-sm'>
        <div className="container-fluid flex-nowrap">
          <NavLink to="/"><img src={logo} id="logo"></img></NavLink>
          <div className="d-flex justify-content-end flex-fill">
            <form className='d-flex input-group' role="search" onSubmit={submit}>
              <input className='form-control ' type='search' placeholder="Tìm kiếm" aria-label="Search"></input>
              <button className='btn btn-dark' type="submit"><SearchIcon /></button>
            </form>
          </div>
          <NavLink to="/shoppingCart" className="btn btn-dark ms-2"><ShoppingCartIcon /></NavLink>
          <Button variant="dark ms-2"><NotificationsIcon/></Button>
          <Dropdown>
            <DropdownToggle variant='dark ms-2'><PersonIcon /></DropdownToggle>
            <DropdownMenu>
              <Dropdown.Item><NavLink to="/login" className="text-decoration-none"><LoginIcon/> Login</NavLink></Dropdown.Item>
              <Dropdown.Item><NavLink to="/register" className="text-decoration-none"><PersonAddIcon/> Register</NavLink></Dropdown.Item>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    </header>
    </>
    
  );
}
