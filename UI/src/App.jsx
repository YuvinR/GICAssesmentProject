import React, { useState } from "react";
import CafePage from "./components/CafePage";
import EmployeePage from "./components/EmployeePage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("cafes");

  const navigateToEmployees = () => setCurrentPage("employees");

  return (
    <div>
      {currentPage === "cafes" && <CafePage navigateToEmployees={navigateToEmployees} />}
      {currentPage === "employees" && <EmployeePage />}
    </div>
  );
};

export default App;
