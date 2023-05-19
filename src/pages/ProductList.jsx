import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
function ProductList(){
    return(
        <>
            <Header/>
            <h1>Product List Component</h1>
            <DemoComp></DemoComp><br/>
            <Link to="/edit-product">Edit Product</Link><br />
            <Link to="/login">Login</Link>
            <Footer/>
        </>
    )
}
function DemoComp(){
    return(
        <>
        demo
        </>
    )
}
export default ProductList;