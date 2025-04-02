import { EmployeeTable } from "../../components/EmployeeTable/EmployeeTable";
import { Navbar } from "../../components/Navbar/Navbar";
import './EmployeeList.scss';

export const EmployeeListPage = () => {

  return (
    <main className="employeeList">
      <Navbar />
      <h2 className="title">Current Employees</h2>
      <EmployeeTable />
    </main>
  );
}