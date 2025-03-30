import { EmployeeForm } from "../../components/EmployeeForm/EmployeeForm";
import { Navbar } from "../../components/Navbar/Navbar";
import './CreateEmployee.scss';

export const CreateEmployeePage = () => {
  return (
    <main className='createEmployee'>
      <Navbar />
      <h2 className="title">Create Employee</h2>
      <EmployeeForm />
    </main >
  )
}