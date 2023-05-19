import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
function Login(){
    return(
        <>
            <Header/>
            <h1>Login Component</h1><br/>
            <Link to="/register">Register</Link><br/>
            <Link to="/product-list">ProductList</Link>
            <Footer/>
        </>
    )
}
export default Login;