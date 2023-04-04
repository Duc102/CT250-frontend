import React, {useState, useEffect} from 'react';
import ConfirmDialog from '../Notification/ConfirmDialog';
import AlertNote from '../Notification/AlertNote';
import { Filter, FilterAltOutlined, FilterAltRounded, FilterList, Functions, PeopleAlt, Search } from '@mui/icons-material';
import SiteUserList from './SiteUserList';
import SiteUserService from '../../../Services/CommonService/SiteUserService';
import SiteUsersContext from './SiteUsersContext';
const AllUsers = (props) => {

    const [siteUsers, setSiteUsers] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: "info" });
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle:"", commit: ()=>{}})


    useEffect(()=>{
        props.setActbar("Users")
        SiteUserService.getAllSiteUsers().then(res=>{
            setSiteUsers(res.data);
        })
    },[]);

    function searchByName(){
        let name = document.getElementById("user-name-value").value;
        SiteUserService.getSiteUsersByName(name).then(res => {
            setSiteUsers(res.data);
        })
    }

    function searchById(){
        let id = document.getElementById("user-id-value").value;
        SiteUserService.getSiteUserById(id).then(res => {
            if(res.data !== ''){
                setSiteUsers([res.data]);
            }
            else setSiteUsers([]);
        });
    }
    return (
        <div className='main-content'>
            <div>
                <h2 className="title-page"><span><PeopleAlt className='icon' />All Users</span></h2>
            </div>
            <h5 className='label text-muted'><FilterAltRounded className='icon' /> Filter</h5>
            
            <div className='d-flex align-item-center' style={{flexWrap: "wrap"}}>
                <div className='search-box'>
                    <input id="user-id-value" type="number" placeholder='Search user by id ...'></input>
                    <span className="icon" onClick={searchById}><Search style={{ color: "white" }} /></span>
                </div>
                <div className='search-box'>
                    <input id="user-name-value" type='search' placeholder='Search user by name ...'></input>
                    <span className="icon" onClick={searchByName}><FilterList style={{ color: "white" }} /></span>
                </div>
            </div>
            
            <h5 className='label text-muted'><Functions className='icon' />Result: {siteUsers.length} user(s)</h5>
            <SiteUsersContext.Provider value={{siteUsers: siteUsers, setSiteUsers: setSiteUsers, setNotify: setNotify, setConfirmDialog: setConfirmDialog}}>
                <SiteUserList siteUsers={siteUsers}/>
            </SiteUsersContext.Provider>
            <AlertNote notify = {notify} setNotify = {setNotify}/>
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}></ConfirmDialog>
        </div>
    );
}

export default AllUsers;
