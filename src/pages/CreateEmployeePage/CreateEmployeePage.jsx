import { CreateEmployeeForm } from "../../components/CreateEmployeeForm/CreateEmployeeForm";
import { Navbar } from "../../components/Navbar/Navbar";
import './CreateEmployee.scss';

export const CreateEmployee = () => {
  return (
    <main className='createEmployee'>
      <Navbar />
      <h2 className="createEmployee__title">Create Employee</h2>
      <CreateEmployeeForm />
    </main >
  )
}