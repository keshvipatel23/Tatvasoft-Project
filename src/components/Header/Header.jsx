import React, { useEffect, useMemo } from "react";
import "./Header.css";
import Logo from "../../assets/Image/tatva.png";
import { Button } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Search from "../searchbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../../state/slice/cartSlice";
import { signOut } from "../../state/slice/authSlice";
import shared from "../../utils/shared";

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart.cartData);
    const authData = useSelector((state) => state.auth.user);

    const logout = () => {
        // authContext.signOut();
        // cartContext.emptyCart();
        dispatch(signOut());
    };

    useEffect(() => {
        const userId = authData.id;

        if (userId && cartData.length === 0) {
            dispatch(fetchCartData(userId));
        }
    }, [authData.id, cartData.length, dispatch]);

    const items = useMemo(() => {
        return shared.NavigationItems.filter(
            (item) => !item.access.length || item.access.includes(authData.roleId)
        );
    }, [authData]);
    return (
        <div className="head1">
            <div className="head2">
                <div className="head3">
                    <div className="img1">
                        <Link to="/">
                            <img src={Logo} alt="" width={'200px'} height={'40px'} />
                        </Link>
                    </div>
                </div>
                {!authData.id && (
                    <>        <div className="head4">
                        <Button variant="text">
                            <Link to="/login" style={{ color: "red", textDecoration: "none" }}>
                                Login
                            </Link>
                        </Button>
                        <Button variant="text">
                            <Link
                                to="/register"
                                style={{ color: "red", textDecoration: "none" }}
                            >
                                Register
                            </Link>
                        </Button>
                    </div>
                    </>
                )}
                <NavLink to="/cart" >
                    <Button
                        variant="outlined"
                        className="Button1"
                        style={{
                            marginLeft: 400,
                            marginRight: 20,
                        }}
                    >
                        Cart
                    </Button>
                </NavLink>



                {
                    authData.id ? (
                        <div className="allBtn">
                            <NavLink to="/categories">
                                <Button variant="outlined" className="Button1">
                                    Category
                                </Button>
                            </NavLink>
                            <NavLink to="/updateProfile">
                                <Button variant="outlined" className="Button1">
                                    Update Profile
                                </Button>
                            </NavLink>
                            <NavLink to="/user">
                                <Button variant="outlined" className="Button1">
                                    User
                                </Button>
                            </NavLink>
                            <NavLink to="/book">
                                <Button variant="outlined" className="Button1">
                                    Book
                                </Button>
                            </NavLink>
                            <Button variant="outlined" className="Button1" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : null
                }



            </div>
            <div className="head5">
                <Search />
            </div>
        </div>
    );
}

export default Header;