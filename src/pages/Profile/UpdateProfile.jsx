import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { setUser } from "../../state/slice/authSlice"
import userService from "../../service/user.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.user);

  const initialValueState = {
    email: authData.email,
    firstName: authData.firstName,
    lastName: authData.lastName,
    newPassword: "",
    confirmPassword: "",
  };

  const [updatePassword, setUpdatePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    newPassword: Yup.string().min(5, "Minimum 5 character is required"),
    confirmPassword: updatePassword
      ? Yup.string()
        .required("Must required")
        .oneOf([Yup.ref("newPassword")], "Password does not match")
      : Yup.string().oneOf([Yup.ref("newPassword")], "Password does not match"),
  });

  const onSubmit = async (values) => {
    const password = values.newPassword ? values.newPassword : authData.password;
    delete values.confirmPassword;
    delete values.newPassword;
    const updatedData = {
      ...authData,
      ...values,
      password,
    };
    const res = await userService.updateProfile(updatedData);
    if (res) {
      dispatch(setUser(res));
      toast.success("User Successfully Updated");
      navigate("/");
    }
  };

  return (
    <div >
      <div className="container">
        <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>
          Update Profile
        </h1>

        <center>
          <hr
            style={{
              background: "red",
              color: "red",
              borderColor: "red",
              height: "4px",
              marginInline: "30px",
              width: "200px",
            }}
          />
        </center>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validator={() => ({})}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <>
              <form action="" onSubmit={handleSubmit}>
                <Grid direction="column">
                  <Grid className="row" style={{ marginInline: 2 }}>
                    <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      id="first-name"
                      name="firstName"
                      label="First Name *"

                      variant="outlined"
                      value={values.firstName}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />



                    <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      id="last-name"
                      name="lastName"
                      label="Last Name *"
                      variant="outlined"
                      value={values.lastName}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />


                  </Grid>
                  <Grid direction="row" style={{ marginTop: 20 }}>
                    <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      id="email"
                      name="email"
                      label="Email *"
                      variant="outlined"
                      value={values.email}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />

                  </Grid>
                  <Grid direction="row" style={{ marginTop: 20 }}>
                    <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      id="newPassword"
                      name="newPassword"
                      label="New Password "
                      variant="outlined"
                      type="password"
                      value={values.newPassword}
                      inputProps={{ className: "small" }}
                      onChange={(e) => {
                        e.target.value !== ""
                          ? setUpdatePassword(true)
                          : setUpdatePassword(false);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      error={touched.newPassword && Boolean(errors.newPassword)}
                      helperText={touched.newPassword && errors.newPassword}
                    />



                    <TextField
                      id="confirmPassword"
                      type="password"
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      name="confirmPassword"
                      label="Confirm Password "
                      variant="outlined"
                      value={values.confirmPassword}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />


                  </Grid>
                </Grid>
                <div className="btn-wrapper">
                  <Button

                    style={{ marginInlineEnd: 30, marginBottom: 8, width: 90 }}
                    variant="contained"
                    type="submit"
                    color="success"
                    disableElevation
                  // onClick={() => {
                  //  navigate("/");
                  // }}
                  >
                    Save
                  </Button>
                  <Button

                    variant="contained"
                    type="submit"
                    color="error"
                    disableElevation
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;