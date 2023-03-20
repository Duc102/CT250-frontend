import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import SiteUserService from '../../../Services/CommonService/SiteUserService';
const Login = (props) => {

    const navigate = useNavigate();
    const [state, setState] = useState(()=>{
        return {
            'name': "",
            'emailAddress': "",
            "password": ""
        }
    });

    const changeEmailHandler = (event)=>{
        setState({...state, emailAddress: event.target.value});
    };

    const changePasswordHandler = (event)=>{
        setState({...state, password: event.target.value});
    };

    const login = (event) => {
        event.preventDefault();
        let siteUser = {
            name : state.name,
            emailAddress: state.emailAddress,
            password: state.password
        };
        console.log("Site user => " + JSON.stringify(siteUser));
        SiteUserService.login(siteUser).then((response)=>{
            let result = response.data;
            if (result) {
                props.exe({
                    id: 1,
                    name: 'link',
                    emailAddress: "link@gmail.com",
                })
                navigate("/")
            }
            console.log(response.data);
        });
    };

    const cancel = () => {
        navigate("/login");
    };
    return (
        <div>
            <div>
                <form>
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
                    <button className='btn btn-success' onClick={login}>Login</button>
                    <button type="reset" className='btn btn-danger ms-1' onClick={cancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
