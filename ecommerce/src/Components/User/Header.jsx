import React from 'react'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "./Images/logo.png"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserContext from './UserContext';

import { Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { Button } from "react-bootstrap"
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Info, Logout } from '@mui/icons-material';
export default function Header() {

  const context = useContext(UserContext);
  const navigate = useNavigate();
  const shoppingCart = context.shoppingCart;
  const siteUser = context.siteUser;

  const submit = (event) => {
    event.preventDefault();
  }

  function howManyProductItems() {
    let howMany = 0;
    shoppingCart.shoppingCartItems?.forEach(line => {
      howMany += line.qty;
    });
    return howMany;
  }

  function goTo(link) {
    navigate(link);
  }

  function logout(){
    localStorage.clear();
    goTo("/login");
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
            <NavLink to="/shoppingCart" className="btn btn-dark ms-2" style={{ position: "relative" }}><ShoppingCartIcon /> <span style={{ position: "absolute", top: "-12px", right: "-5px", borderRadius: "50%", width: "25px", height: "24px", display: "inline-block", backgroundColor: "red" }}>{howManyProductItems()}</span></NavLink>
            <Button variant="dark ms-2"><NotificationsIcon /></Button>
            <Dropdown>
              <DropdownToggle variant='dark ms-2'><PersonIcon /></DropdownToggle>
              <DropdownMenu>
                {
                  siteUser.id !== 0
                    ? 
                    <>
                      <Dropdown.Item onClick={() => goTo("/userInfo/"+siteUser.id)}><Info /> Info</Dropdown.Item>
                      <Dropdown.Item onClick={logout}><Logout /> Logout</Dropdown.Item>
                    </>
                    :
                    <>
                      <Dropdown.Item onClick={() => goTo("/login")}><LoginIcon /> Login</Dropdown.Item>
                      <Dropdown.Item onClick={() => goTo("/register")}><PersonAddIcon /> Register</Dropdown.Item>
                    </>
                }
              </DropdownMenu>
            </Dropdown>
          </div>
        </nav>
      </header>
    </>

  );
}
