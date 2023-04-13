import React from 'react';
import qr from "./Images/group-qr.webp"
import android from "./Images/android.svg"
import ios from "./Images/ios.svg"
import Li from './Li';
import youtubeIcon from "./Images/youtube.svg"
import facebookIcon from "./Images/facebook.svg"
import certificate from "./Images/certificate.webp"
import linkedinIcon from './Images/LinkedIn.png'


const Footer = () => {
    return (
        <footer className='container rounded border border-dark p-1' style={{minWidth: "515px"}}>
            <div className='row'>
                <div className='col-6 col-sm'>
                    <h5 className='text-center'>Application</h5>
                    <div className='d-flex align-items-center justify-content-center'>
                        <img src={qr} width='75px' alt='qr code'></img>
                        <ul className='list-group ms-2 '>
                            <li className='list-group-item border-0 bg-transparent'><img src={android} width='90px' alt='android'></img></li>
                            <li className='list-group-item border-0 bg-transparent' ><img src={ios} width='90px' alt='ios'></img></li>
                        </ul>
                    </div>
                </div>
                <div className='col d-none d-md-block'>
                    <h5 className='text-center'>Custormer Service</h5>
                    <ul className='list-group'>
                        <Li content="Help Center"></Li>
                        <Li content = "How To Buy"></Li>
                        <Li content = "Privacy Policy"></Li>
                        <Li content = "Contact Us"></Li>
                    </ul>
                </div>
                <div className='col d-none d-md-block'>
                    <h5 className='text-center'>About <span className='text-danger fw-bold' style={{whiteSpace: "nowrap"}}>Tech Accessories</span></h5>
                    <ul className='list-group'>
                        <Li content = "About us"></Li>
                        <Li content = "Communication"></Li>
                        <Li content = "Careers"></Li>
                        <Li content = "Blog"></Li>
                    </ul>
                </div>

                <div className='col'>
                    <h5 className='text-center'>Follow US</h5>
                    <ul className='list-group list-group-horizontal justify-content-evenly'>
                        <li className='list-group-item border-0 p-1 bg-transparent'><img src={facebookIcon}></img></li>
                        <li className='list-group-item border-0 p-1 bg-transparent'><img src={linkedinIcon} width="32px"></img></li>
                        <li className='list-group-item border-0 p-1 bg-transparent'><img src={youtubeIcon}></img></li>
                    </ul>
                    <h5 className='text-center'>Certification</h5>
                    <div className='text-center'><img src={certificate}></img></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;