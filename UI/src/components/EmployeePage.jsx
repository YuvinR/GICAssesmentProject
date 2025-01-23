import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getEmployees, deleteEmployee } from "../api";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployees();
      setEmployees(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const columnDefs = [
    { headerName: "Employee ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email Address", field: "email" },
    { headerName: "Phone Number", field: "phone" },
    { headerName: "Days Worked", field: "daysWorked" },
    { headerName: "Café Name", field: "cafeName" },
    {
      headerName: "Actions",
      cellRenderer: ({ data }) => (
        <div>
          <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(data.id)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <Box>
      <h1>Employee Manager</h1>
      <Button variant="contained" color="success" style={{ marginBottom: 20 }}>
        Add New Employee
      </Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact rowData={employees} columnDefs={columnDefs} />
      </div>
    </Box>
  );
};

export default EmployeePage;
