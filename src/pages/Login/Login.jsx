import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import * as Yup from "yup";
import { setUser } from "../../state/slice/authSlice";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import { useDispatch } from "react-redux";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const str = JSON.parse(localStorage.getItem("user"));
        if (str?.id) {
            dispatch(setUser(str));
            navigate("/");
        }
    }, []);

    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is Required"),
        password: Yup.string()
            .min(6, "Password must be 6 charaters at minimum")
            .required("Password must Required"),
    });

    const onSubmit = (values) => {
        authService
            .login(values)
            .then((res) => {
                delete res._id;
                delete res.__v;
                dispatch(setUser(res));
                navigate("/bookList");
                toast.success("Successfully logged in");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>

            <div className="link1">
                <h4>Home</h4>
                <p>Login</p>
            </div>
            <h2>Login or Create an Account</h2>
            <div className="cust">
                <div className="new">
                    <h3>New Customer</h3>
                    <hr />
                    <p>Registration is free and easy</p>
                    <ul>
                        <li>Faster checkout</li>
                        <li>Save multiple shipping addresses</li>
                        <li>View and track orders and more.</li>
                    </ul>
                    <Button
                        className="pink-btn btn"
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Create an Account
                    </Button>
                </div>
                <div className="old">
                    <h3>Registered Customer</h3>
                    <hr />
                    <h5>If you have an account with us, please login</h5>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="mail mail1 ">
                                    <p>Email Address*</p>
                                    <TextField
                                        size="medium"
                                        className="txt1"
                                        id="email"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        variant="outlined"
                                        inputProps={{ className: "small" }}
                                    />
                                    <ValidationErrorMessage
                                        message={errors.email}
                                        touched={touched.email}
                                    />
                                </div>
                                <div className="p1 p11">
                                    <p>Password*</p>
                                    <TextField
                                        size="medium"
                                        className="txt1"
                                        id="password"
                                        name="password"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        variant="outlined"
                                        inputProps={{ className: "small" }}
                                    />
                                    <ValidationErrorMessage
                                        message={errors.password}
                                        touched={touched.password}
                                    />
                                </div>
                                <div className="btn1">
                                    <Button
                                        className="pink-btn btn"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                    >
                                        Login
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Login;