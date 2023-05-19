import React from "react";
import Logo from "../Image/Logo/tatva.png";
import "./Header.css";
import { Link } from "react-router-dom";

function Header(){
    return(
        <>
        <div className="container">
            <div className="img1">
                <img src={Logo} alt="" width={'200px'} height={'40px'} />
            </div>
            <div className="items">
                <ul>
                    <Link to="/login"><li className="dev">Login </li></Link>
                    <Link to="/register"><li>Register</li></Link>
                    <Link to="/cart"><li><button>Cart</button></li></Link>
                </ul>
            </div>
        </div>
        <div className="search">
            <input type="text" name="" id="" placeholder="What are you looking for..."/>
            <button style={{backgroundColor:"rgb(97, 204, 26)"}}>Search</button>
            <button style={{backgroundColor:"#f14d54"}}>Cancel</button>
        </div>
        </>
    )
}

export default Header;