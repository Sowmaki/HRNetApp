import { useContext, useState } from "react";
import { EmployeeTable } from "../../components/EmployeeTable/EmployeeTable";
import { Navbar } from "../../components/Navbar/Navbar";
import { EmployeesContext } from "../../context/EmployeesContext";
import './EmployeeList.scss';

export const EmployeeListPage = () => {
  const { employees } = useContext(EmployeesContext);
  const [listLength, setListLength] = useState(10)
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // On applique d'abord la recherche
  const filteredEmployees = employees.filter(employee =>
    employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(query.toLowerCase())
  );

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredEmployees.length / listLength);

  // Obtenir la liste des employés pour la page actuelle
  const startIndex = (currentPage - 1) * listLength;
  const visibleEmployees = filteredEmployees.slice(startIndex, startIndex + listLength);

  // Gérer la recherche
  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1); // Revenir à la première page quand on recherche
  };

  // Gérer le changement du nombre d'éléments affichés
  const handleChangeListLength = (e) => {
    setListLength(Number(e.target.value));
    setCurrentPage(1); // Revenir à la première page après un changement
  };

  // Gérer la navigation entre les pages
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <main className="employeeList">
      <Navbar />

      <h2 className="title">Current Employees</h2>

      <header className="employeeList__header">
        <div className="employeeList__header__selectLength">
          <label htmlFor="select-list-length">Show </label>
          <select name="listLength" id="select-list-length" onChange={handleChangeListLength}>
            <option value={10} defaultValue>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span> entries</span>
        </div>
        <div className="employeeList__header__search">
          <label htmlFor="search-input">Search: </label>
          <input type="text" name="search" id="search-input" value={query} onChange={handleChangeQuery} />
        </div>
      </header>

      <EmployeeTable list={visibleEmployees} />

      <footer className="employeeList__footer">
        <p className="employeeList__footer__infos">Show {employees.length ? 1 : 0} to {listLength} of {employees.length} entries</p>
        {/* Pagination */}
        <div className="employeeList__footer__pagination">
          <button className='button' onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {totalPages} </span>
          <button className="button" onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </footer>
    </main>
  )
}