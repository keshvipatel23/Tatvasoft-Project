import React, { useEffect, useState } from "react";
import "./EditBook.css";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Input,
  FormControl,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import bookService from "../../service/book.service";
import { Formik } from "formik";
import { toast } from "react-toastify";
import categoryService from "../../service/category.service";

const EditBook = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    price: "",
    categoryId: 0,
    description: "",
    base64image: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    if (id) getBookById();
    categoryService.getAll().then((res) => {
      setCategories(res);
    });
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.number()
      .min(1, "Category is required")
      .required("Category is required"),
    price: Yup.number().required("Price is required"),
    base64image: Yup.string().required("Image is required"),
  });

  const getBookById = () => {
    bookService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.id,
        name: res.name,
        price: res.price,
        categoryId: res.categoryId,
        description: res.description,
        base64image: res.base64image,
      });
    });
  };

  const onSubmit = (values) => {
    bookService
      .save(values)
      .then((res) => {
        toast.success(
          values.id
            ? "Record updated successfully"
            : "Record created successfully"
        );
        navigate("/book");
      })
      .catch((e) => toast.error("Record update fail"));
  };

  const onSelectFile = (e, setFieldValue, setFieldError) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        if (fileSelected.size > 50000) {
          toast.error("File size must be less then 50KB");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("base64image", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg,jpeg and png files are allowed");
      }
    } else {
      setFieldValue("base64image", "");
    }
  };
  return (
    <>
      <div className="editWrapper">
        <div className="container">
          <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>
            {id ? "Edit" : "Add"} Book
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
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,

              setFieldError,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid direction="column">
                  <Grid direction="row">
                    <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      id="first-name"
                      name="name"
                      label="Book Name *"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />

                    <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      type={"number"}
                      id="price"
                      name="price"
                      label="Book Price (RS)*"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.price}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>
                  <Grid direction="row">
                    <FormControl
                      className="dropdown-wrapper"
                      variant="outlined"
                    >
                      <Select
                        style={{
                          height: 50,
                          width: 550,
                          marginInline: 30,
                          marginTop: 40,
                        }}
                        name={"categoryId"}
                        id={"category"}
                        onChange={handleChange}
                        className={"customSelect"}
                        value={values.categoryId}
                        error={touched.categoryId && Boolean(errors.categoryId)}
                        helperText={touched.categoryId && errors.categoryId}
                      >
                        {categories?.map((rl) => (
                          <MenuItem value={rl.id} key={"category" + rl.id}>
                            {rl.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {!values.base64image && (
                      <>
                        {" "}
                        <label
                          htmlFor="contained-button-file"
                          className="file-upload-btn"
                        >
                          <Input
                            style={{
                              height: 50,
                              width: 450,
                              marginInline: 30,
                              marginTop: 40,
                            }}
                            id="contained-button-file"
                            type="file"
                            inputProps={{ className: "small" }}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              onSelectFile(e, setFieldValue, setFieldError);
                            }}
                            error={
                              touched.base64image && Boolean(errors.base64image)
                            }
                            helperText={
                              touched.base64image && errors.base64image
                            }
                          />
                          <Button
                            variant="contained"
                            component="span"
                            className="btn pink-btn"
                            style={{
                              width:"50px"
                            }}
                          >
                            Upload
                          </Button>
                        </label>
                      </>
                    )}
                    {values.base64image && (
                      <label
                        style={{
                          height: 50,
                          width: 550,
                          marginInline: 30,
                          marginTop: 40,
                        }}
                      >
                        <em>
                          <img
                            src={values.base64image}
                            alt=""
                            style={{ height: 40, width: 40, marginTop: 45,
                              marginRight: 15 }}
                          />
                        </em>
                        image{" "}
                        <span
                          onClick={() => {
                            setFieldValue("base64image", "");
                          }}
                        >
                          x
                        </span>
                      </label>
                    )}
                  </Grid>
                  <Grid>
                    <TextField
                      style={{
                        height: 50,
                        width: 900,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      multiline
                      id="description"
                      name="description"
                      label="Description *"
                      variant="outlined"
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                </Grid>
                <div className="btn-wrapper">
                  <Button
                    style={{ marginInlineEnd: 30,marginBottom:"5px",height:"35px",width:"91px" }}
                    className="green-btn btn"
                    variant="contained"
                    type="submit"
                    color="success"
                    disableElevation
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    type="button"
                    color="error"
                    disableElevation
                    onClick={() => {
                      navigate("/book");
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
    </>
  );
};

export default EditBook;