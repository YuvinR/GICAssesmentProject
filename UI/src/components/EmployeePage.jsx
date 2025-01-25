import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField, Box, Typography } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getEmployees, deleteEmployee } from "../api";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddEmployeeDialog from './AddEmployeeDialog';
import { Visibility, Delete } from "@mui/icons-material";

const columns = [
  { field: 'id', headerName: 'Id', width: 200 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 150 },
  { field: 'daysWorked', headerName: 'DaysWorked', width: 150 },
  { field: 'cafeName', headerName: 'CafeName', width: 150 }
];

const paginationModel = { page: 0, pageSize: 5 };

const EmployeePage = ({ navigateToCafe, id }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployees(id);
      setEmployees(response.data);
    };
    fetchData();
    
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddedOREditedEmployee = (cafe) => {
    handleClose();
    const fetchData = async () => {
      const response = await getEmployees(id);
      setEmployees(response.data);
    };
    fetchData();
    
  }

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleEdit = (cafe) => {
    setSelectedEmp(cafe);
    setIsEdit(true);
    handleClickOpen();
  };

  const handleAdd = (cafe) => {
    setSelectedEmp({});
    setIsEdit(false);
    handleClickOpen();
  };

  const genderLookup = (gender) => {
    switch (gender) {
      case 1:
        return 'Male';
      case 2:
        return 'Female';
      default:
        return '-';
    }
  };

  return (
    <Paper sx={{ height: 800, width: '100%', marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="h2" align="center">
        Employee Manager
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%', marginTop: 3 }}>
        <Button
          variant="outlined"
          color="success"
          onClick={() => navigateToCafe()}
          sx={{ marginBottom: 2 }}
        >
          Back
        </Button>
        <Button
            variant="contained"
            color="success"
            onClick={() => handleAdd()}
            sx={{ marginBottom: 2 }}
          >
            Add Employee
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={employees.map(emp => ({ ...emp, gender: genderLookup(emp.gender) }))}
              columns={[
                ...columns.map((col) =>
                  col.field === 'employeeCount'
                    ? {
                      ...col
                    }
                    : col
                ),
                {
                  field: "actions",
                  headerName: "Actions",
                  width: 250,
                  renderCell: (params) => (
                    <Box>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: 'blue', borderColor: 'blue' }}
                        onClick={() => handleEdit(params.row)}
                        startIcon={<Visibility />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: 'red', borderColor: 'red' }}
                        onClick={() => handleDelete(params.row.id)}
                        startIcon={<Delete />}
                        style={{ marginLeft: 8 }}
                      >
                        Delete
                      </Button>
                    </Box>
                ),
              },
            ]}
            columnVisibilityModel={{
              id: false,
            }}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
      <AddEmployeeDialog open={open} onCloseEmp={handleClose} onEmpAdded={handleAddedOREditedEmployee} emp={selectedEmp} isEdit={isEdit} cafeId={id} />
    </Paper>
  );
};

export default EmployeePage;
