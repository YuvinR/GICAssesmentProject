import React, { useState } from "react";
import CafePage from "./components/CafePage";
import EmployeePage from "./components/EmployeePage";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const App = () => {
  const [currentPage, setCurrentPage] = useState("cafes");
  const [cafeId, setCafeId] = useState();

  const navigateToEmployees = (id) => {
     setCurrentPage("employees");
     setCafeId(id);
  }
  const navigateToCafe = () => setCurrentPage("cafes");

  return (
   

<Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
  <Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      News
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>


</AppBar>
  <div>
      {currentPage === "cafes" && <CafePage navigateToEmployees={navigateToEmployees} />}
        {currentPage === "employees" && <EmployeePage navigateToCafe={navigateToCafe} id={cafeId} />}
    </div>
</Box>
  );
};

export default App;
