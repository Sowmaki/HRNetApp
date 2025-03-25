import { useContext } from "react";
import { EmployeesContext } from "../../context/EmployeesContext";
import './EmployeeList.scss';

export const EmployeeList = () => {
    const { employees } = useContext(EmployeesContext);
    console.log(employees);


    return (
        <ul className="employeeList__list">
            {employees.map((employee, index) => (
                <li key={index}>
                    {employee.firstName} - {employee.department} - {employee.startDate}
                </li>
            ))}
        </ul>
    );
};

