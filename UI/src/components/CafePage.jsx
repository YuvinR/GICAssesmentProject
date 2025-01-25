import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField, Box, Typography } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getCafes, deleteCafe } from "../api";

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Visibility, Delete } from "@mui/icons-material";
import AddCafeDialog from './AddCafeDialog';

const columns = [
  { field: 'id', headerName: 'id', width: 200 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 150 },
  { field: 'employeeCount', headerName: 'Employees', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },

];

const paginationModel = { page: 0, pageSize: 5 };

const CafePage = ({ navigateToEmployees }) => {
  const [cafes, setCafes] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddedOREditedCafe = (cafe) => {
    const fetchData = async () => {
      const response = await getCafes(locationFilter);
      setCafes(response.data);
    };
    fetchData();
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await getCafes(locationFilter);
      setCafes(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteCafe(id);
    setCafes((prev) => prev.filter((cafe) => cafe.id !== id));
  };


  const handleEdit = (cafe) => {
    setSelectedCafe(cafe);
    setIsEdit(true);
    handleClickOpen();
  };

  const handleAdd = (cafe) => {
    setSelectedCafe({});
    setIsEdit(false);
    handleClickOpen();
  };

  return (
    <Paper sx={{ height: 800, width: '100%', marginTop: 3 }}>
      <Typography variant="h4" component="h2" align="center">
        Café Manager
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
        <TextField
          label="Filter Location"
          variant="outlined"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const fetchData = async () => {
              const response = await getCafes(locationFilter);
              setCafes(response.data);
            };
            fetchData();
          }}
        >
          Filter Location
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '80%', marginTop: 3 }}>
        <Paper sx={{ height: 36 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleAdd()}
            sx={{ marginBottom: 2 }}
          >
            Add Cafe
          </Button>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Paper sx={{ height: 400, width: '60%' }}>
          <DataGrid
            rows={cafes}
            columns={[
              ...columns.map((col) =>
                col.field === 'employeeCount'
                  ? {
                    ...col,
                    renderCell: (params) => (
                      <Button
                        variant="text"
                        onClick={() => navigateToEmployees(params.row.id)}
                      >
                        {params.value}
                      </Button>
                    ),
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
      <AddCafeDialog open={open} onClose={handleClose} onCafeAdded={handleAddedOREditedCafe} cafe={selectedCafe} isEdit={isEdit} />
    </Paper>
  );
};

export default CafePage;
