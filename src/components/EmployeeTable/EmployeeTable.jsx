import { useState } from 'react';
import faChevronDown from "../../assets/icons/fachevrondown.svg";
import { states } from "../../data/states";
import './EmployeeTable.scss';

export const EmployeeTable = ({ list }) => {
    const [activeColumn, setActiveColumn] = useState(null)

    const keys =
        !list.length ?
            []
            :
            [
                ...Object.keys(list[0]),
            ]

    return (
        <>
            <table className='employeeTable'>
                <thead>
                    <tr className='employeeTable__row--header'>
                        {keys?.map((employeeKey, index) =>
                            <th className='employeeTable__header-cell' key={`${employeeKey}${index}`}>
                                <h3 className='employeeTable__header-cell__title'>{employeeKey.toUpperCase()}</h3>
                                <img
                                    className={`employeeTable__header-cell__icon ${activeColumn === index ? "rotated" : ""}`}
                                    onClick={() => setActiveColumn(activeColumn === index ? null : index)}
                                    src={faChevronDown}
                                ></img>
                            </th>)}
                    </tr>
                </thead>
                <tbody>
                    {list.map((employee, employeeIndex) => {
                        // Trouve l'abréviation de l'état
                        const stateAbbr = states.find(state => state.name === employee.state)?.abbreviation || employee.state;

                        // Construire les valeurs à afficher
                        const values = [
                            employee.firstName,
                            employee.lastName,
                            employee.dateOfBirth,
                            employee.startDate,
                            employee.department,
                            employee.street,
                            employee.city,
                            stateAbbr,  // Remplace le nom par l'abréviation
                            employee.zipCode
                        ];
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
        </>

    );
};

