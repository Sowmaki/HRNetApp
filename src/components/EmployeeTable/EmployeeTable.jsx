import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import faChevronDown from "../../assets/icons/fachevrondown.svg";
import { states } from "../../data/states";
import { setCurrentPage, setListLength, setQuery } from "../../redux/employeesSlice";
import './EmployeeTable.scss';

export const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { list: employees, query, listLength, currentPage } = useSelector((state) => state.employees);

  // État pour suivre la colonne active et l'ordre de tri
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fonction de tri
  const sortEmployees = (employeesList, key, direction) => {
    return [...employeesList].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (!valueA || !valueB) return 0; // Éviter les erreurs si valeur absente

      // Détection du type de données
      const isDate = /\d{2}\/\d{2}\/\d{4}/.test(valueA); // Format MM/DD/YYYY
      const isNumber = !isNaN(valueA) && !isNaN(valueB);

      if (isDate) {
        return direction === 'asc'
          ? new Date(valueB) - new Date(valueA) // Du plus récent au plus ancien
          : new Date(valueA) - new Date(valueB);
      }

      if (isNumber) {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  };

  // Appliquer le tri 
  const sortedEmployees = sortConfig.key ? sortEmployees(employees, sortConfig.key, sortConfig.direction) : employees;

  // Filtrage des employés triés
  const filteredEmployees = sortedEmployees.filter(employee =>
    employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(query.toLowerCase())
  );
  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / listLength);
  const startIndex = (currentPage - 1) * listLength;
  const visibleEmployees = filteredEmployees.slice(startIndex, startIndex + listLength);

  // Animation Colonnes
  const [activeColumn, setActiveColumn] = useState(null)

  // Definitions des clés pour les colonnes
  const employeeKeys = !visibleEmployees.length ? [] : [...Object.keys(visibleEmployees[0]),]

  // Gestion du clic sur une colonne pour trier
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="employee-table">

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

      <table className='employeeTable'>
        <thead>
          <tr className='employeeTable__row--header'>
            {
              employeeKeys?.map((employeeKey, index) =>
                <th className='employeeTable__header-cell' key={`${employeeKey}${index}`}>
                  <h3 className='employeeTable__header-cell__title'>{employeeKey.toUpperCase()}</h3>
                  <img
                    className={`employeeTable__header-cell__icon ${activeColumn === index ? "rotated" : ""}`}
                    onClick={() => handleSort(employeeKey)}
                    src={faChevronDown}
                  ></img>
                </th>)
            }
          </tr>
        </thead>
        <tbody>
          {visibleEmployees.map((employee, employeeIndex) => {

            const stateAbbr = states.find(state => state.name === employee.state)?.abbreviation || employee.state;

            const values = [
              employee.firstName,
              employee.lastName,
              employee.dateOfBirth,
              employee.startDate,
              employee.department,
              employee.street,
              employee.city,
              stateAbbr,
              employee.zipCode
            ]

            return (
              <tr className='employeeTable__row' key={`${employee.firstName}_${employee.lastName}_${employeeIndex}`}>
                {values.map((value, valueIndex) =>
                  <td className={`employeeTable__cell ${activeColumn === valueIndex ? "active" : ""}`} key={`${value}${valueIndex}`}>{`${value}`}</td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>

      <footer className="employeeList__footer">
        <p className="employeeList__footer__infos">Show {employees.length ? startIndex + 1 : 0} to {Math.min(startIndex + listLength, filteredEmployees.length)} of {filteredEmployees.length} entries</p>
        <div className="employeeList__footer__pagination">
          <button className='button' onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {totalPages} </span>
          <button className="button" onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </footer>

    </div>
  );
};

