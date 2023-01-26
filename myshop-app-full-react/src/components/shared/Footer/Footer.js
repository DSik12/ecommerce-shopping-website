import React, { Component } from 'react'
import Menu from '../Header/Menu/Menu';
import './Footer.scss';
import instalogo from '../../../assets/images/insta.png';
import facebooklogo from '../../../assets/images/fb.png'
import twitterlogo from '../../../assets/images/tweet.png'
import whatsapplogo from '../../../assets/images/whatsapp.png'

class Footer extends Component {
    render() {
        return (
            <footer className="footerWrapper" >
                <nav className="primaryNav">
                  
                    <Menu />
                </nav>
                <div className="contactUs">
                    <span><a href="https://www.instagram.com/"><img src={instalogo} width={40} height={40} alt="Insta Icon" /></a></span>
                    <span><a href="https://facebook.com"><img src={facebooklogo} width={40} height={40} alt="Facebook Icon" /></a></span>
                    <span><a href="https://twitter.com"><img src={twitterlogo} width={40} height={40} alt="Twitter Icon" /></a></span>
                    <span><a href="https://whatsapp.com"><img src={whatsapplogo} width={40} height={40} alt="Whatsapp Icon" /></a></span>
                </div>
                <h4 className="copyrightText">©2022Copyright|MyShop</h4>
            </footer>
        )
    }
}
export default Footer;