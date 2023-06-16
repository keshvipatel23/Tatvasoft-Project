import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../service/category.service";
import { Formik } from "formik";
import { toast } from "react-toastify";
import shared from "../../utils/shared";

const EditCategory = () => {
 
  const navigate = useNavigate();
  const initialValues = { name: "" };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getCategoryById();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const getCategoryById = () => {
    categoryService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.id,
        name: res.name,
      });
    });
  };

  const onSubmit = (values) => {
    categoryService
      .save(values)
      .then((res) => {
        toast.success("Update Sucessfully");
        navigate("/categories");
      })
      .catch((e) => toast.error("Update fail"));
  };
  return (
    <div >
      <div className="container">
      <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>
            {id ? "Edit" : "Add"} Category
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
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                   style={{
                    // height: 50,
                    width: 550,
                    marginInline: 30,
                    marginTop: 20,
                  }}
                    id="first-name"
                    name="name"
                    label="Category Name *"
                    variant="outlined"
                    size="small"
                    inputProps={{ className: "small" }}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.name&& Boolean(errors.name)}
                    helperText={touched.name&& errors.name}
                  />
                 
                </div>
              </div>
              <div className="btn-wrapper">
                <Button
                  // className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="success"
                  style={{marginInlineEnd:20, width:92, marginBottom:10}}
                  disableElevation
                >
                  Save
                </Button>
                <Button
                  // className="pink-btn btn"
                  variant="contained"
                  type="button"
                  color="error"
                  disableElevation
                  onClick={() => {
                    navigate("/categories");
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

export default EditCategory;