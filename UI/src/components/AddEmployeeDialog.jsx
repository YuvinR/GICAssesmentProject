import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { addEmployee } from "../api";

const AddEmployeeDialog = ({ open, onClose, onEmployeeAdded }) => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phone: "",
    daysWorked: "",
    cafeName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await addEmployee(employeeData);
      onEmployeeAdded(response.data); // Pass the new employee data to parent
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Employee</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="dense"
          value={employeeData.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="dense"
          value={employeeData.email}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Phone"
          fullWidth
          margin="dense"
          value={employeeData.phone}
          onChange={handleChange}
        />
        <TextField
          name="daysWorked"
          label="Days Worked"
          fullWidth
          margin="dense"
          value={employeeData.daysWorked}
          onChange={handleChange}
        />
        <TextField
          name="cafeName"
          label="Café Name"
          fullWidth
          margin="dense"
          value={employeeData.cafeName}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;
