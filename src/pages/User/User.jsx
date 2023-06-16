import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../service/user.service";
import { RecordsPerPage, defaultFilter } from "../../utils/constants";
import { Typography, TextField, TableContainer, TableHead, TableRow, TableCell, Table, TableBody, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { useSelector } from "react-redux";

function User() {

  const authData = useSelector((state) => state.auth.user);
  const [filters, setFilters] = useState(defaultFilter);
  const [userList, setUserList] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      getAllUsers({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const getAllUsers = async (filters) => {
    await userService.getAllUsers(filters).then((res) => {
      if (res) {
        setUserList(res);
      }
    });
  };

  const columns = [
    { id: "firstName", label: "First Name", minWidth: 100 },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "roleName", label: "Role", minWidth: 130 },
  ];

  const onConfirmDelete = async () => {
    await userService
      .deleteUser(selectedId)
      .then((res) => {
        if (res) {
          toast.success("User Deleted Successfully !");
          setOpen(false);
          setFilters({ ...filters });
        }
      })
      .catch((e) => toast.error("User not deleted, error!"));
  };

  return (

    <div className="productWrapper">
      <div className="container">
        <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>
          User
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
        <div className="products">
          <div className="btn-wrapper" style={{ marginInlineEnd: "auto" }}>
            <TextField
              id="text"
              size="small"
              name="text"
              placeholder="Search..."
              variant="outlined"
              inputProps={{ className: "small" }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />

          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>

                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}>
                      {column.label}

                    </TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>

              </TableHead>
              <TableBody>
                {userList?.items?.map((row, index) => (
                  <TableRow key={`${index}-${row.id}-${row.email}`}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        className="green-btn btn"
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => {
                          navigate(`/edit-user/${row.id}`);
                        }}
                      >
                        Edit
                      </Button>
                      {row.id !== authData.id && (
                        <Button
                          type="button"
                          className="btn pink-btn"
                          variant="contained"
                          color="primary"
                          disableElevation
                          onClick={() => {
                            setOpen(true);
                            setSelectedId(row.id ?? 0);
                          }}
                        >
                          Delete
                        </Button>
                      )}

                    </TableCell>
                  </TableRow>
                ))}
                {!userList.items.length && (
                  <TableRow className="TableRow">
                    <TableCell colSpan={5} className="TableCell">
                      <Typography align="center" className="noDataText">
                        No User
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={RecordsPerPage}
            component="div"
            count={userList?.totalItems || 0}
            rowsPerPage={filters.pageSize || 0}
            page={filters.pageIndex - 1}
            onPageChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage + 1 });
            }}
            onRowsPerPageChange={(e) => {
              setFilters({
                ...filters,
                pageIndex: 1,
                pageSize: Number(e.target.value),
              });
            }}
          />
          <ConfirmationDialog
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={() => onConfirmDelete()}
            title="Delete User"
            description="Are you sure you want to delete this User?"
          />


        </div>
      </div>
    </div>

  );
}
export default User;