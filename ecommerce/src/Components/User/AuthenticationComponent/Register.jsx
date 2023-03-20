import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import SiteUserService from '../../../Services/CommonService/SiteUserService';
const Register = () => {

    const navigate = useNavigate();
    const [state, setState] = useState(()=>{
        return {
            'name': "",
            'emailAddress': "",
            "password": ""
        }
    });

    const changeNameHandler = (event)=>{
        setState({...state, name: event.target.value});
    };


    const changeEmailHandler = (event)=>{
        setState({...state, emailAddress: event.target.value});
    };

    const changePasswordHandler = (event)=>{
        setState({...state, password: event.target.value});
    };

    const saveEmployee = (event) => {
        event.preventDefault();
        let siteUser = {
            name : state.name,
            emailAddress: state.emailAddress,
            password: state.password
        };
        console.log("Site user => " + JSON.stringify(siteUser));
        SiteUserService.register(siteUser).then((response)=>{
            console.log(response.data);
        });
    };

    const cancel = () => {
        navigate("/employees");
    };
    return (
        <div>
            <div>
                <form>
                    <div>
                        <label>Name</label>
                        <input placeholder='Name' name='name'
                            value={state.firstName} onChange={changeNameHandler} />
                    </div>
                    <div className='form-group'>
                        <label>Email Address: </label>
                        <input type="email" placeholder='Email Address' name='emailId'
                            value={state.emailId} onChange={changeEmailHandler} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder='Password' name='password'
                            value={state.lastName} onChange={changePasswordHandler} />
                    </div>
                    <button className='btn btn-success' onClick={saveEmployee}>Register</button>
                    <button className='btn btn-danger ms-1' onClick={cancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
