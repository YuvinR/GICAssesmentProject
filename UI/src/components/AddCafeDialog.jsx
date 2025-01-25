import React, { useState,useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { addCafe,updateCafe } from "../api";

const AddCafeDialog = ({ open, onClose, onCafeAdded, cafe,isEdit }) => {
  const [cafeData, setCafeData] = useState({
    id: cafe?.id || "",
    logo: cafe?.logo || "",
    name: cafe?.name || "",
    description: cafe?.description || "",
    location: cafe?.location || "",
  });

  useEffect(() => {
    if (isEdit && cafe) {
      setCafeData({
        id:cafe.id,
        logo: cafe.logo,
        name: cafe.name,
        description: cafe.description,
        location: cafe.location,
      });
    }else{
      setCafeData({
        logo: "",
        name: "",
        description: "",
        location: "",
      });
    }
  }, [isEdit, cafe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCafeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      var newCafeData = {
        "cafeData": cafeData
      };
      let response;
      if (isEdit) {
        response = await updateCafe(cafe.id, newCafeData); // Assuming updateCafe is an API function to update the café
      } else {
        response = await addCafe(newCafeData);
      }
      onCafeAdded(response.data); // Pass the new or updated café data to parent
      onClose();
    } catch (error) {
      console.error("Error adding or updating café:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? "Edit Café" : "Add New Café"}</DialogTitle>
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
          {cafe ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCafeDialog;
