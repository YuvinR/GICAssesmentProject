import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField, Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getCafes, deleteCafe } from "../api";

const CafePage = ({ navigateToEmployees }) => {
  const [cafes, setCafes] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCafes();
      setCafes(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteCafe(id);
    setCafes((prev) => prev.filter((cafe) => cafe.id !== id));
  };

  const filteredCafes = cafes.filter((cafe) =>
    cafe.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  const columnDefs = [
    { headerName: "Logo", field: "logo", cellRenderer: ({ value }) => <img src={value} alt="logo" style={{ height: 50 }} /> },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees", cellRenderer: ({ value }) => (
        <Button variant="contained" onClick={() => navigateToEmployees(value)}>View Employees</Button>
      )
    },
    { headerName: "Location", field: "location" },
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
      <h1>Café Manager</h1>
      <TextField
        label="Filter by Location"
        variant="outlined"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button variant="contained" color="success" style={{ marginBottom: 20 }}>
        Add New Café
      </Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact rowData={filteredCafes} columnDefs={columnDefs} />
      </div>
    </Box>
  );
};

export default CafePage;
