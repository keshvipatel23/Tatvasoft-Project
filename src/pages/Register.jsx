import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
function Register(){
    return(
        <>
        <Header/>
            {/* <h1>Register Component</h1> */}
            <div className="link1">
                <h4>Home</h4>
                <Link to="/register"><p>Create an account</p></Link>
            </div>
            <h2>Login or Create an Account</h2>
            {/* <Link to="/register"><button>Register</button></Link> */}

            <div className="prsnl">
                <p className="prsnlinfo">Personal Information</p>
                <hr />
                <p className="light">Please enter the following information to create your account.</p>
            </div>
            <div className="info">
                <div className="fname">
                    <p>First Name*</p>
                    <input type="text" name="fname" id="fname" required/>
                </div>
                <div className="lname">
                    <p>Last Name*</p>
                    <input type="text" name="lname" id="lname" required/>
                </div>
            </div>
            <div className="mail">
                <p>Email Address*</p>
                <input type="email" name="mail" id="mail" required/>
            </div>
            <div className="login">
                <h2>Login Information</h2>
                <hr />
                <div className="pass">
                    <div className="p1">
                        <p>Password*</p>
                        <input type="password" name="pass" id="pass" required/>
                    </div>
                    <div className="p2">
                        <p>Confirm Password*</p>
                        <input type="password" name="pass" id="pass" required/>
                    </div>

                </div>
            </div>
            <div className="btn">
                <button>Register</button>
            </div>

        <Footer/>
        </>
    )
}
export default Register;