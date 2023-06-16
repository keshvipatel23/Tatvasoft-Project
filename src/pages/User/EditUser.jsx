import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../service/user.service";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/auth";
import { useSelector } from "react-redux";

const EditUser = () => {
  // const authContext = useAuthContext();
  // const [roles, setRoles] = useState([]);
  // const [user, setUser] = useState();
  // const navigate = useNavigate();
  // const initialValues = {
  //   id: 0,
  //   email: "",
  //   lastName: "",
  //   firstName: "",
  //   roleId: 3,
  // };
  // const [initialValueState, setInitialValueState] = useState(initialValues);
  // const { id } = useParams();

  // useEffect(() => {
  //   getRoles();
  // }, []);

  // useEffect(() => {
  //   if (id) {
  //     getUserById();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  // useEffect(() => {
  //   if (user && roles.length) {
  //     const roleId = roles.find((role) => role.name === user?.role)?.id;
  //     setInitialValueState({
  //       id: user.id,
  //       email: user.email,
  //       lastName: user.lastName,
  //       firstName: user.firstName,
  //       roleId,
  //       password: user.password,
  //     });
  //   }
  // }, [user, roles]);

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("Invalid email address format")
  //     .required("Email is required"),
  //   firstName: Yup.string().required("First Name is required"),
  //   lastName: Yup.string().required("Last Name is required"),
  //   roleId: Yup.number().required("Role is required"),
  // });

  // const getRoles = () => {
  //   userService.getAllRoles().then((res) => {
  //     if (res) {
  //       setRoles(res);
  //     }
  //   });
  // };

  // const getUserById = () => {
  //   userService.getById(Number(id)).then((res) => {
  //     if (res) {
  //       setUser(res);
  //     }
  //   });
  // };

  // const onSubmit = (values) => {
  //   const updatedValue = {
  //     ...values,
  //     role: roles.find((r) => r.id === values.roleId).name,
  //   };
  //   userService
  //     .update(updatedValue)
  //     .then((res) => {
  //       if (res) {
  //         toast.success("User update sucessfully");
  //         navigate("/user");
  //       }
  //     })
  //     .catch((e) => toast.error("User update fail"));
  // };

  const authData = useSelector((state) => state.auth.user);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState();
  const {id} = useParams();
  const navigate = useNavigate();
  const initialValues = {
  id: 0,
  email: "",
  lastName: "",
  firstName: "",
  roleId: 3,
};
  const [initialValueState, setInitialValueState] = useState(initialValues);
  
  useEffect(() => {
      getRoles();
    }, []);
  
  useEffect(() => {
      if (id) {
        getUserById();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
      if (user && roles.length) {
        const roleId = roles.find((role) => role.name === user?.role)?.id;
        setInitialValueState({
          id: user.id,
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
          roleId,
          password: user.password,
        });
      }
    }, [user, roles]);
  
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      roleId: Yup.number().required("Role is required"),
    });
  
    const getRoles = () => {
      userService.getAllRoles().then((res) => {
        if (res) {
          setRoles(res);
        }
      });
    };
  
    const getUserById = () => {
      userService.getById(Number(id)).then((res) => {
        if (res) {
          setUser(res);
        }
      });
    };
  
    const onSubmit = (values) => {
      const updatedValue = {
        ...values,
        role: roles.find((r) => r.id === values.roleId).name,
      };
      userService
        .update(updatedValue)
        .then((res) => {
          if (res) {
            toast.success("User updated successfully !");
            navigate("/user");
          }
        })
        .catch((e) => toast.error("Not Updated,error !"));
    };

  return (
    <div >
      <div className="container">
      <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>
            Edit User
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
            <form onSubmit={handleSubmit}>
              <Grid direction="column">
                <Grid direction="row" style={{marginTop:30}}>
                  <TextField
                    id="first-name"
                    style={{
                      height: 50,
                      width: 550,
                      marginInline: 30,
                      marginTop: 20,
                    }}
                    name="firstName"
                    label="First Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.firstName&& Boolean(errors.firstName)}
                    helperText={touched.firstName&& errors.firstName}
                  />
                  
                
                
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      height: 50,
                      width: 550,
                      marginInline: 30,
                      marginTop: 20,
                    }}
                    id="last-name"
                    name="lastName"
                    label="Last Name *"
                    value={values.lastName}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    error={touched.lastName&& Boolean(errors.lastName)}
                    helperText={touched.lastName&& errors.lastName}
                  />
                 
                
                </Grid>
                <Grid direction="row" style={{marginTop:30}}>
                  
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="email"
                    style={{
                      height: 50,
                      width: 550,
                      marginInline: 30,
                      marginTop: 20,
                    }}
                    name="email"
                    label="Email *"
                    value={values.email}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    error={touched.email&& Boolean(errors.email)}
                    helperText={touched.email&& errors.email}
                  />
                 
                
                {values.id !== authData.id && (
                  
                    <FormControl
                    style={{
                      height: 50,
                      width: 550,
                      marginInline: 30,
                      marginTop: 20,
                    }}
                      className="dropdown-wrapper"
                      variant="outlined"
                      disabled={values.id === authData.id}
                    >
                      <Select
                      
                        name="roleId"
                        id={"roleId"}
                        onChange={handleChange}
                        disabled={values.id === authData.id}
                        MenuProps={{
                        }}
                        value={values.roleId}
                      >
                        {roles.length > 0 &&
                          roles.map((role) => (
                            <MenuItem value={role.id} key={"name" + role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  
                )}
                </Grid>
              </Grid>
              <div className="btn-wrapper">
                <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  style={{marginInlineEnd:30, marginBottom:10,height:35}}
                  color="success"
                    disableElevation
                >
                  Save
                </Button>
                <Button
                  className="pink-btn btn"
                  variant="contained"
                  type="button"
                  style={{height:35}}
                  color="error"
                  disableElevation
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUser;