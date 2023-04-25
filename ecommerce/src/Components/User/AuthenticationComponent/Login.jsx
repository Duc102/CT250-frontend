import { Facebook, Google, LoginRounded, RepeatOneSharp, VisibilityOff } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import SiteUserService from '../../../Services/CommonService/SiteUserService';
const Login = (props) => {

    const navigate = useNavigate();
    const [state, setState] = useState(() => {
        return {
            'name': "",
            'emailAddress': "",
            "password": ""
        }
    });

    const changeEmailHandler = (event) => {
        setState({ ...state, emailAddress: event.target.value });
    };

    const changePasswordHandler = (event) => {
        setState({ ...state, password: event.target.value });
    };

    const login = (event) => {
        event.preventDefault();
        let siteUser = {
            name: state.name,
            emailAddress: state.emailAddress,
            password: state.password
        };
        SiteUserService.login(siteUser).then((response) => {
            let result = response.data;
            if (result) {
                props.exe({ ...response.data })
                if(response.data.name === "Link")
                    navigate("/administrator");
                else 
                    navigate("/")
            } else 
                alert("Email or password is incorrect!");
        });
    };

    const cancel = () => {
        navigate("/login");
    };
    return (
        <div>
            <main className="container border border-dark rounded mt-1 mb-1 bg-dark">
                <div>
                    <h2 className="title-page text-center"><span><LoginRounded className='icon' />Welcome to <span style={{ whiteSpace: 'nowrap', padding: "0px", color: 'red', fontWeight: "bold" }}>Tech Accessories</span></span></h2>
                </div>
                <div className="text-end text-muted">New member? <NavLink className="text-decoration-none" to="/register">Sing up</NavLink> here</div>
                <article className="row pt-4 pb-4">
                    <div className="col-12 col-sm-6 mb-3">
                        <form className="w-100">
                            <table className="w-100">
                                <tbody>
                                    <tr><td><label className="form-label fw-bold text-light" htmlFor="email">Phone number or Email <span className="text-danger">*</span></label></td></tr>
                                    <tr><td className="text-center"><input type="text" id="email" className="form-control" placeholder="Please type your phone number or email" value={state.emailId} onChange={changeEmailHandler}></input></td></tr>
                                    <tr><td><label className="form-label fw-bold text-light" htmlFor="pass">Password <span className="text-danger">*</span></label></td></tr>
                                    <tr><td className="input-group"><input type="password" id="pass" className="form-control" placeholder="Please type your password" value={state.lastName} onChange={changePasswordHandler}></input><span className=" input-group-text"><VisibilityOff /></span></td></tr>
                                    <tr><td className="text-end"><a href="#" className="text-decoration-none">Forgot password?</a></td></tr>
                                </tbody>

                            </table>
                        </form>
                    </div>
                    <div className="col-12 col-sm-6">
                        <table className="w-100 text-center">
                            <tbody>
                                <tr><td><button className="btn btn-light w-75 p-3 fw-bold" type="submit" onClick={login}>Login</button></td></tr>
                                <tr><td className="text-muted">Or, login by </td></tr>
                                <tr><td className="p-1"><button className="btn btn-primary w-75 fw-bold"><Facebook /> Facebook</button></td></tr>
                                <tr><td className="p-1"><button className="btn btn-danger w-75 fw-bold"><Google /> Google</button></td></tr>
                            </tbody>
                        </table>
                    </div>

                </article>

            </main>
        </div>
    );
}

export default Login;
