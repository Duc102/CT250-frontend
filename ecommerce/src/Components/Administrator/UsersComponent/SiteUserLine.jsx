import React, { useContext, useEffect, useState } from 'react';
import SiteUsersContext from './SiteUsersContext';
import SiteUserService from '../../../Services/CommonService/SiteUserService';
import { Delete, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const SiteUserLine = (props) => {
    const [siteUser, setSiteUser] = useState(props.siteUser);
    const context = useContext(SiteUsersContext);
    const setConfirmDialog = context.setConfirmDialog;
    const setNotify = context.setNotify;
    const setSiteUsers = context.setSiteUsers;
    const siteUsers = context.siteUsers;
    const navigate = useNavigate();
    useEffect(()=>{
        setSiteUser(props.siteUser)
    }, [props])
    function deleteSiteUser(){
        setConfirmDialog({
            isOpen: true,
            title: "Are you sure delete this record?",
            subTitle: "You can't undo this operation.",
            commit: () => {
                SiteUserService.deleteSiteUser(siteUser.id).then(response => {
                    console.log("Delete Result: ", response.data);
                    setNotify({ isOpen: true, message: "Update successful!", type: "success" })
                })
                let ls = siteUsers;
                let el = ls.filter(su => su.id === siteUser.id);
                let index = ls.indexOf(el[0]);
                ls.splice(index, 1);
                setSiteUsers([...ls]);
            }
        });
    }
    function goToSiteUserDetail(){
        navigate(siteUser.id +"/detail")
    }
    return (
        <tr>
            <td width={"50px"}>{props.no + 1}</td>
            <td>{siteUser.id}</td>
            <td>{siteUser.name}</td>
            <td>{siteUser.emailAddress}</td>
            <td style={{ textAlign: "center" }} className='m-1'>
                <div>
                    <button className='btn' style={{ color: "#0d6efd" }} title='Info' onClick={goToSiteUserDetail}><Info /></button>
                    <button className='btn text-danger' title='Delete' onClick={deleteSiteUser}><Delete /></button>
                </div>
            </td>

        </tr>
    );
}

export default SiteUserLine;
