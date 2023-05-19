import React from "react";
import Logo from "../Image/Logo/tatva.png";
import "./Footer.css";

function Footer(){
    return(
        <>
        <div className="container1">
            <img src={Logo} alt="logo" height={"45px"} width={"170px"}/>
            <p>© 2016 Tatvasoft.com all rights reserved</p>
        </div>
        </>
    )
}

export default Footer;