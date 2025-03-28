import { createContext, useState } from "react";
import { employeeListMock } from "../mocks/employeeListMock";

// Création du contexte
export const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState(employeeListMock);// On initialise avec une liste mockée pour tester

  // Fonction pour ajouter un employé
  const addEmployee = (employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  return (
    <EmployeesContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
};
