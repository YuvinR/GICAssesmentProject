import React, { useState,useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { addEmployee,updateEmployee } from "../api";

const AddEmployeeDialog = ({ open, onCloseEmp, onEmployeeAdded, emp = {}, isEdit, cafeId }) => {
  const [employeeData, setEmployeeData] = useState({
    id:emp?.id || "",
    name: emp?.name || "",
    email: emp?.email || "",
    phone: emp?.phone || "",
    daysWorked: emp?.daysWorked || "",
    cafeName: emp?.cafeName || "",
    startDate: emp?.startDate || "",
    gender:emp?.gender || ""
  });

  useEffect(() => {
    if (isEdit && emp) {
      setEmployeeData({
        id:emp.id,
        name: emp.name,
        email: emp.email,
        phone: emp.phone,
        daysWorked: emp.daysWorked,
        gender:emp.gender,
        cafeName: emp.cafeName,
        startDate: emp.startDate
      });
    } else {
      setEmployeeData({
        id:"",
        name: "",
        email: "",
        phone: "",
        daysWorked: "",
        cafeName: "",
        startDate: ""
      });
    }
  }, [isEdit, emp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let response;
      setEmployeeData((prev) => ({ ...prev, cid: cafeId }));
      var newCafeData = {
        "employeeData": employeeData
      };
      if (isEdit) {
        response = await updateEmployee(employeeData.id, newCafeData); // Assuming updateEmployee is an API function to update the employee
      } else {
        response = await addEmployee(newCafeData);
      }
      onEmployeeAdded(response.data); // Pass the new or updated employee data to parent
      onCloseEmp();
    } catch (error) {
      console.error("Error adding or updating employee:", error);
    }
  };

  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const phoneRegex = /^[89]\d{0,7}$/;

    if (!phoneRegex.test(value)) {
      setPhoneError("Phone number must start with 8 or 9 and be up to 8 digits long");
    } else {
      setPhoneError("");
    }

    setEmployeeData((prev) => ({ ...prev, phone: value }));
  };

  return (
    <Dialog open={open} onClose={onCloseEmp}>
      <DialogTitle>{isEdit ? "Edit Employee" : "Add New Employee"}</DialogTitle>
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
          onChange={handlePhoneChange}
          error={!!phoneError}
          helperText={phoneError}
        />
        
        <TextField
          select
          name="gender"
          label="Gender"
          fullWidth
          margin="dense"
          value={employeeData.gender}
          onChange={(e) => setEmployeeData((prev) => ({ ...prev, gender: parseInt(e.target.value) }))}
          SelectProps={{
            native: true,
          }}
        >
          <option value=""></option>
          <option value='1'>Male</option>
          <option value='2'>Female</option>
        </TextField>
        <TextField
          name="startDate"
          label="Start Date"
          type="date"
          fullWidth
          margin="dense"
          value={employeeData.startDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseEmp}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!!phoneError}>
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;
