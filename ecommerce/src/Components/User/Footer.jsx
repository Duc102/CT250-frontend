import React from 'react';
import qr from "./Images/group-qr.webp"
import android from "./Images/android.svg"
import ios from "./Images/ios.svg"
import Li from './Li';
import youtubeIcon from "./Images/youtube.svg"
import facebookIcon from "./Images/facebook.svg"
import certificate from "./Images/certificate.webp"

const Footer = () => {
    return (
        <footer className='container rounded border border-dark p-1'>
            <div className='row'>
                <div className='col-6 col-sm'>
                    <h5 className='text-center'>Ứng dụng</h5>
                    <div className='d-flex align-items-center justify-content-center'>
                        <img src={qr} width='75px' alt='qr code'></img>
                        <ul className='list-group ms-2 '>
                            <li className='list-group-item border-0 bg-transparent'><img src={android} width='90px' alt='android'></img></li>
                            <li className='list-group-item border-0 bg-transparent' ><img src={ios} width='90px' alt='ios'></img></li>
                        </ul>
                    </div>
                </div>
                <div className='col d-none d-md-block'>
                    <h5 className='text-center'>Hỗ trợ khách hàng</h5>
                    <ul className='list-group'>
                        <Li content="Trung tâm trợ giúp"></Li>
                        <Li content = "An toàn mua bán"></Li>
                        <Li content = "Quy định cần thiết"></Li>
                        <Li content = "Quy chế quyền riêng tư"></Li>
                        <Li content = "Liên hệ hỗ trợ"></Li>
                    </ul>
                </div>
                <div className='col d-none d-md-block'>
                    <h5 className='text-center'>Về Tech Accessories</h5>
                    <ul className='list-group'>
                        <Li content="Giới thiệu"></Li>
                        <Li content = "Truyền thông"></Li>
                        <Li content = "Tuyển dụng"></Li>
                        <Li content = "Blog"></Li>
                    </ul>
                </div>

                <div className='col'>
                    <h5 className='text-center'>Liên hệ</h5>
                    <ul className='list-group list-group-horizontal justify-content-evenly'>
                        <li className='list-group-item border-0 p-1 bg-transparent'><img src={facebookIcon}></img></li>
                        <li className='list-group-item border-0 p-1 bg-transparent'><img src={youtubeIcon}></img></li>
                    </ul>
                    <h5 className='text-center'>Chứng nhận</h5>
                    <div className='text-center'><img src={certificate}></img></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;