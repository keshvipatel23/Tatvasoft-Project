import React, { useEffect, useState } from "react";
import './Cart.css';
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import cartService from "../../service/cart.service";
import { toast } from "react-toastify";
import { removeFromCart, setCartData, fetchCartData } from "../../state/slice/cartSlice"
import orderService from "../../service/order.service";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart.cartData);
    const navigate = useNavigate();
    const authData = useSelector((state) => state.auth.user);
    const [cartList, setCartList] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const getTotalPrice = (itemList) => {
        let totalPrice = 0;
        itemList.forEach((item) => {
            const itemPrice = item.quantity * parseInt(item.book.price);
            totalPrice = totalPrice + itemPrice;
        });
        setTotalPrice(totalPrice);
    };

    useEffect(() => {
        setCartList(cartData);
        setItemsInCart(cartData.length);
        getTotalPrice(cartData);
    }, [cartData]);

    const removeItem = async (id) => {
        try {
            const res = await cartService.removeItem(id);
            if (res) {
                dispatch(removeFromCart(id)); // Dispatch the action to remove item from cart
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const updateQuantity = async (cartItem, inc) => {
        const currentCount = cartItem.quantity;
        const quantity = inc ? currentCount + 1 : currentCount - 1;
        if (quantity === 0) {
            toast.error("Item quantity should not be zero");
            return;
        }

        try {
            const res = await cartService.updateItem({
                id: cartItem.id,
                userId: cartItem.userId,
                bookId: cartItem.book.id,
                quantity,
            });
            if (res) {
                const updatedCartList = cartList.map((item) =>
                    item.id === cartItem.id ? { ...item, quantity } : item
                );
                dispatch(setCartData(updatedCartList)); // Dispatch the action to update cart data in the Redux store
                const updatedPrice =
                    totalPrice +
                    (inc
                        ? parseInt(cartItem.book.price)
                        : -parseInt(cartItem.book.price));
                setTotalPrice(updatedPrice);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const placeOrder = async () => {
        if (authData.id) {
            const userCart = await cartService.getList(authData.id);
            if (userCart.length) {
                try {
                    let cartIds = userCart.map((element) => element.id);
                    const newOrder = {
                        userId: authData.id,
                        cartIds,
                    };
                    const res = await orderService.placeOrder(newOrder);
                    if (res) {
                        dispatch(fetchCartData(authData.id)); // Dispatch the action to fetch updated cart data
                        navigate("/");
                        toast.success("Order placed successfully");
                    }
                } catch (error) {
                    toast.error(`Order cannot be placed ${error}`);
                }
            } else {
                toast.error("Your cart is empty");
            }
        }
    };


    return (
        <>
            <div className="cart-container-center">
                <h1
                    className="ff-r txt-41"
                >
                    Cart Page
                </h1>

                <hr />
            </div>
            <div className="cart-container-main">

                <div className="cart-info-header">
                    <div className="cart-info-header-lft">
                        <h3 className="txt-lb">
                            My Shopping Bag ({itemsInCart} items)
                        </h3>
                    </div>

                    <div className="cart-info-header-rght">
                        <h4 className="txt-lb">
                            Total Price: {totalPrice}
                        </h4>
                    </div>
                </div>



                <div className="cart-container-allproducts">
                    {cartList.map((cartItem) => {
                        return (
                            <div className="cart-container-product" key={cartItem.id}>

                                <div className="cart-container-product-lft">

                                    <img
                                        src={cartItem.book.base64image}
                                    />

                                </div>

                                <div className="cart-container-product-middle">

                                    <div className="cart-product-name">
                                        <h4 className="txt-lb">
                                            {cartItem.book.name}
                                        </h4>
                                    </div>

                                    <div className="cart-product-link">
                                        <Link>
                                            Cart item name
                                        </Link>
                                    </div>

                                    <div className="cart-product-inc-dec-btn">
                                        <Button
                                            variant="contained"
                                            className="bg-f14d54 f1-btn-hover"
                                            onClick={() => {
                                                updateQuantity(cartItem, true)
                                            }
                                            }
                                        >
                                            +
                                        </Button>

                                        <span> {cartItem.quantity} </span>

                                        <Button
                                            variant="contained"
                                            className="bg-f14d54 f1-btn-hover"
                                            onClick={() => {
                                                updateQuantity(cartItem, false)
                                            }
                                            }
                                        >
                                            -
                                        </Button>
                                    </div>

                                </div>

                                <div className="cart-container-product-rght">
                                    <h4 className="txt-lb">
                                        MRP {cartItem.book.price}
                                    </h4>

                                    <Link
                                        onClick={() => removeItem(cartItem.id)}
                                    >
                                        Remove
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="cart-place-order-btn">
                    <Button
                        variant="contained"
                        className="bg-f14d54 f1-btn-hover"
                        onClick={placeOrder}
                        style={{ backgroundColor: "#f14d54", marginBottom: 10 }}
                    >
                        Place Order
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Cart;