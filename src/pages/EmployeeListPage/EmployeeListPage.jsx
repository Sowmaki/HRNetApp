import { EmployeeList } from "../../components/EmployeeList/EmployeeList";
import { Navbar } from "../../components/Navbar/Navbar";
import './EmployeeList.scss';

export const EmployeeListPage = () => {
  return (
    <main className="employeeList">
      <Navbar />
      <h2 className="employeeList__title">Current Employees</h2>
      <EmployeeList />
    </main>
  )
}