import { } from "module";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import { EmployeesProvider } from "./context/EmployeesContext.jsx";
import { CreateEmployee } from "./pages/CreateEmployeePage/CreateEmployeePage.jsx";
import { EmployeeListPage } from "./pages/EmployeeListPage/EmployeeListPage.jsx";

createRoot(document.getElementById('root')).render(
  <>
    <EmployeesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/employee-list" element={<EmployeeListPage />} />
          <Route path="*" element={<h2>Page non trouvée 😢</h2>} />
        </Routes>
      </BrowserRouter>
    </EmployeesProvider>
  </>,
)
