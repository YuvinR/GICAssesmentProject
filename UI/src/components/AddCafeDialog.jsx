import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { addCafe } from "../api";

const AddCafeDialog = ({ open, onClose, onCafeAdded }) => {
  const [cafeData, setCafeData] = useState({
    logo: "",
    name: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCafeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await addCafe(cafeData);
      onCafeAdded(response.data); // Pass the new café data to parent
      onClose();
    } catch (error) {
      console.error("Error adding café:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Café</DialogTitle>
      <DialogContent>
        <TextField
          name="logo"
          label="Logo URL"
          fullWidth
          margin="dense"
          value={cafeData.logo}
          onChange={handleChange}
        />
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="dense"
          value={cafeData.name}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          margin="dense"
          value={cafeData.description}
          onChange={handleChange}
        />
        <TextField
          name="location"
          label="Location"
          fullWidth
          margin="dense"
          value={cafeData.location}
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

export default AddCafeDialog;
