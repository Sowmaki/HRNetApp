import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { states } from "../../data/states";
import './EmployeeTable.scss';

export const EmployeeTable = ({ list }) => {
    const [isActive, setIsActive] = useState(false)
    console.log(list);

    const keys = [
        ...Object.keys(list[0]).filter(key => key !== "address"),
        ...Object.keys(list[0].address)
    ];


    return (
        <>
            <table className='employeeTable'>
                <thead>
                    <tr className='employeeTable__row'>
                        {keys.map((key, index) =>
                            <th className='employeeTable__header-cell' key={`${key}${index}`}>
                                {key.toUpperCase()}
                                <FontAwesomeIcon
                                    className={`employeeTable__header-cell__icon ${isActive && 'active-column'}`}
                                    icon={faChevronDown}
                                    onClick={() => setIsActive(!isActive)} />
                            </th>)}
                    </tr>
                </thead>
                <tbody>
                    {list.map((employee, index) => {
                        // Trouve l'abréviation de l'état
                        const stateAbbr = states.find(state => state.name === employee.address.state)?.abbreviation || employee.address.state;

                        // Fonction pour formater une date "YYYY-MM-DD" → "MM/DD/YYYY"
                        const formatDate = (dateString) => {
                            if (!dateString) return "";
                            const [year, month, day] = dateString.split("-");
                            return `${month}/${day}/${year}`;
                        };

                        // Construire les valeurs à afficher
                        const values = [
                            employee.firstName,
                            employee.lastName,
                            formatDate(employee.birthDate),  // Reformate la date de naissance
                            formatDate(employee.startDate),  // Reformate la date de début
                            employee.department,
                            employee.address.street,
                            employee.address.city,
                            stateAbbr,  // Remplace le nom par l'abréviation
                            employee.address.zipCode
                        ];
                        return (
                            <tr className='employeeTable__row' key={`${employee.firstName}_${employee.lastName}_${index}`}>
                                {values.map((value, index) =>
                                    <td className='employeeTable__cell' key={`${value}${index}`}>{`${value}`}</td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    );
};

