import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import SiteUserService from '../../../Services/CommonService/SiteUserService';
import './Register.css';
import { Facebook, Google, LoginRounded, VisibilityOff } from '@mui/icons-material';
const Register = () => {

    const navigate = useNavigate();
    const [state, setState] = useState(() => {
        return {
            'name': "",
            'emailAddress': "",
            "password": ""
        }
    });

    const changeNameHandler = (event) => {
        setState({ ...state, name: event.target.value });
    };


    const changeEmailHandler = (event) => {
        setState({ ...state, emailAddress: event.target.value });
    };

    const changePasswordHandler = (event) => {
        setState({ ...state, password: event.target.value });
    };

    const register = (event) => {
        event.preventDefault();
        let siteUser = {
            name: state.name,
            emailAddress: state.emailAddress,
            password: state.password
        };
        SiteUserService.register(siteUser).then((response) => {
            if(response.data)
                navigate("/login")
            else {
                alert("Ehe email was registered");
            }
        });
    };

    return (
        <div className='register-page'>
            <main className="container border border-dark rounded mt-1 mb-1 bg-dark">
                <div>
                    <h2 className="title-page text-center"><span><LoginRounded className='icon' />Welcome to <span style={{ whiteSpace: 'nowrap', padding: "0px", color: 'red', fontWeight: "bold" }}>Tech Accessories</span></span></h2>
                </div>
                <div className="text-end text-muted">Already a member? <NavLink className="text-decoration-none" to="/login">Sign in</NavLink> here</div>
                <article className="row pt-4 pb-4">
                    <div className="col-12 col-sm-6 mb-3">
                        <form className="w-100" id="registerForm">
                            <table className="w-100">
                                <tbody>
                                    <tr><td><label className="form-label fw-bold text-light" htmlFor="name">Your Name <span className="text-danger">*</span></label></td></tr>
                                    <tr>
                                        <td className="text-center">
                                            <input type="text" id="name" className="form-control" placeholder="Your full name" required value={state.firstName} onChange={changeNameHandler}></input>
                                        </td>
                                    </tr>
                                    <tr><td><label className="form-label fw-bold text-light" htmlFor="email">Your Email <span className="text-danger">*</span></label></td></tr>
                                    <tr>
                                        <td className="text-center">
                                            <input type="text" id="email" className="form-control" placeholder="Please type your email" required value={state.emailId} onChange={changeEmailHandler}></input>
                                        </td>
                                    </tr>
                                    <tr><td><label className="form-label fw-bold text-light" htmlFor="pass">Password <span className="text-danger">*</span></label></td></tr>
                                    <tr><td className="input-group"><input type="password" id="pass" className="form-control" placeholder="Minimum 8 characters with numbers, letters and characters" required value={state.lastName} onChange={changePasswordHandler}></input><span className=" input-group-text"><VisibilityOff/></span></td></tr>

                                    <tr><td className="fw-bold text-light">Sex</td></tr>
                                    <tr>
                                        <td className="row">
                                            <div className="col">
                                                <input id="male" className="form-check-input" type="radio" value="1" name="sex" required></input> <label className="form-check-label text-light" htmlFor="male"> Male </label>
                                            </div>

                                            <div className="col">
                                                <input id="female" className="form-check-input" type="radio" value="2" name="sex" required></input> <label className="form-check-label text-light" htmlFor="female"> Female </label>
                                            </div>

                                            <div className="col">
                                                <input id="other" className="form-check-input" type="radio" value="3" name="sex" required></input> <label className="form-check-label text-light" htmlFor="other"> Other </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div className="col-12 col-sm-6">
                        <table className="w-100 text-center">
                            <tbody>
                                <tr><td><button className="btn btn-light w-75 p-3 fw-bold" type="submit" onClick={register}>Register</button></td></tr>
                                <tr><td>
                                    <div className="w-75 m-auto text-light" style={{ textAlign: "justify" }}>
                                        <input type="checkbox" defaultChecked className="d-inline"></input> I have read and agree to Tech Accessories <a href="#" className="text-decoration-none">Terms of Use</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>, including the right to collect,
                                        use and disclose my personal data as required by law.</div>
                                </td></tr>
                                <tr><td className="text-muted">Or, sign up with</td></tr>
                                <tr><td className="p-1"><button className="btn btn-light w-75 border border-dark fw-bold"><i className="fa fa-envelope pe-3 "></i> Register with Mobile</button></td></tr>
                                <tr><td className="p-1">
                                    <div className="row w-75 m-auto">
                                        <button className="btn btn-primary col m-1 fw-bold text-nowrap"><Facebook /> Facebook</button>
                                        <button className="btn btn-danger col m-1 fw-bold text-nowrap"><Google /> Google</button>
                                    </div>
                                </td></tr>
                            </tbody>
                        </table>
                    </div>

                </article>

            </main>
        </div>
    );
}

export default Register;
