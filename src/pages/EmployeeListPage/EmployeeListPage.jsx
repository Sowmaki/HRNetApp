import { useDispatch, useSelector } from "react-redux";
import { EmployeeTable } from "../../components/EmployeeTable/EmployeeTable";
import { Navbar } from "../../components/Navbar/Navbar";
import { setCurrentPage, setListLength, setQuery } from "../../redux/employeesSlice";
import './EmployeeList.scss';

export const EmployeeListPage = () => {
  const dispatch = useDispatch();
  const { list: employees, query, listLength, currentPage } = useSelector((state) => state.employees);

  // Filtrage des employés
  const filteredEmployees = employees.filter(employee =>
    employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / listLength);
  const startIndex = (currentPage - 1) * listLength;
  const visibleEmployees = filteredEmployees.slice(startIndex, startIndex + listLength);

  return (
    <main className="employeeList">
      <Navbar />
      <h2 className="title">Current Employees</h2>

      <header className="employeeList__header">
        <div className="employeeList__header__selectLength">
          <label htmlFor="select-list-length">Show </label>
          <select id="select-list-length" value={listLength} onChange={(e) => dispatch(setListLength(Number(e.target.value)))}>
            {[10, 25, 50, 100].map(size => <option key={size} value={size}>{size}</option>)}
          </select>
          <span> entries</span>
        </div>
        <div className="employeeList__header__search">
          <label htmlFor="search-input">Search: </label>
          <input type="text" id="search-input" value={query} onChange={(e) => dispatch(setQuery(e.target.value))} />
        </div>
      </header>

      <EmployeeTable employees={visibleEmployees} />

      <footer className="employeeList__footer">
        <p className="employeeList__footer__infos">Show {employees.length ? startIndex + 1 : 0} to {Math.min(startIndex + listLength, filteredEmployees.length)} of {filteredEmployees.length} entries</p>
        <div className="employeeList__footer__pagination">
          <button className='button' onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {totalPages} </span>
          <button className="button" onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </footer>
    </main>
  );
}