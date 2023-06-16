import React, { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
// import axios from 'axios';
import userService from "../../service/user.service";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        roleId: 0,
        password: "",
        confirmPassword: "",
    };

    const [roleList, setRoleList] = useState([]);

    useEffect(() => {
        if (roleList.length) return;
        getRoles();
    }, [roleList]);
    const getRoles = () => {
        userService.getAllRoles().then((res) => {
            setRoleList(res);
        });
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be of 6 character")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref("password"), null],
                "Password and Confirm password must be same"
            )
            .required("Confirm password is required"),
        firstName: Yup.string()
            .required("First name is required")
            .matches(/^[A-Za-z]*$/, "Name cannot contain number"),
        lastName: Yup.string().required("Last name is required")
            .matches(/^[A-Za-z]*$/, "Name cannot contain number"),
        roleId: Yup.number().required("Role is required"),
    });
    // useEffect(()=>{
    //     axios.get('https://jsonplaceholder.typicode.com/posts').then((data) => {
    //         console.log(data.data)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    // },[])

    const onSubmit = (data) => {
        // alert(JSON.stringify(data))
        delete data.confirmPassword;
        console.log("form data", data);
        authService.create(data).then((res) => {
            navigate("/login");
            toast.success("successfully registered");
        })
    };

    return (
        <>
            <div className="link1">
                <h4>Home</h4>
                <p>Create an account</p>
            </div>
            <h2>Login or Create an Account</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    initialValues
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="prsnl">
                            <p className="prsnlinfo">Personal Information</p>
                            <hr />
                            <p className="light">Please enter the following information to create your account.</p>
                            <div className="info">
                                <div className="fname">
                                    <p>First Name*</p>
                                    <TextField className="name1"
                                        // size="small"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        id="first-name"
                                        defaultValue={initialValues.firstName}
                                        name="firstName"
                                        // label="First Name *"
                                        variant="outlined"
                                        inputProps={{ className: "small" }}
                                    />
                                    <ValidationErrorMessage
                                        message={errors.firstName}
                                        touched={touched.firstName}
                                    />
                                </div>
                                <div className="lname">
                                    <p>Last Name *</p>
                                    <TextField className="name1 height"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue={initialValues.lastName}
                                        id="last-name"
                                        name="lastName"
                                        // label="Last Name *"
                                        variant="outlined"
                                        inputProps={{ className: "small" }}
                                    />
                                    <ValidationErrorMessage
                                        message={errors.lastName}
                                        touched={touched.lastName}
                                    />
                                </div>
                            </div>
                            <div className="temp1" style={{ display: 'flex', width: '100%' }}>
                                <div className="mail">
                                    <p>Email Address *</p>
                                    <TextField className="name2"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue={initialValues.email}
                                        id="email"
                                        name="email"
                                        // label="Email Address *"
                                        variant="outlined"
                                        inputProps={{ className: "small" }}
                                    />
                                    <ValidationErrorMessage
                                        message={errors.email}
                                        touched={touched.email}
                                    />
                                </div>
                                <div className="role">
                                    <FormControl
                                        className="dropdown-wrapper"
                                        variant="outlined"
                                    >
                                        <p style={{ margin: '20px 0 0 10px' }}>Roles</p>
                                        <Select style={{ width: '570px', height: '38px', margin: '15px 0  0 10px' }}
                                            name="roleId"
                                            id="roleId first-name"
                                            defaultValue={initialValues.roleId}
                                            inputProps={{ className: "small" }}
                                            onChange={handleChange}
                                       
                                        >
                                            {roleList.length > 0 &&
                                                roleList.map((role) => (
                                                    <MenuItem
                                                        value={role.id}
                                                        key={"name" + role.id}
                                                    >
                                                        {role.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        <ValidationErrorMessage
                                            message={errors.roleId}
                                            touched={touched.roleId}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="login" >
                            <h2>Login Information</h2>
                            <hr />
                            <div className="pass">
                                <div className="p1">
                                    <p>Password *</p>
                                    <TextField className="name1"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue={initialValues.email}
                                        id="password"
                                        type="password"
                                        name="password"
                                        variant="outlined"
                                        inputProps={{ className: "small" }}
                                    />
                                    <ValidationErrorMessage
                                        message={errors.password}
                                        touched={touched.password}
                                    />
                                </div>
                                <div className="p2">
                                    <p>Confirm Password *</p>
                                    <TextField className="name1"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue={initialValues.email}
                                        id="confirm-password"
                                        type="password"
                                        name="confirmPassword"
                                        variant="outlined"
                                        inputProps={{ className: "small" }}
                                    />
                                    <ValidationErrorMessage
                                        message={errors.confirmPassword}
                                        touched={touched.confirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="btn">
                            <Button
                                className="pink-btn btn"
                                variant="contained"
                                type="submit"
                                color="primary"
                                disableElevation
                            >
                                Register
                            </Button>
                        </div>
                        </div>
                        
                    </form>
                )}
            </Formik>
        </>
    )
}
export default Register;