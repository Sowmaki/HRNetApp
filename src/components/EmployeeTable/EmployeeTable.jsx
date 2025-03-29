import { useState } from 'react';
import faChevronDown from "../../assets/icons/fachevrondown.svg";
import { states } from "../../data/states";
import './EmployeeTable.scss';

export const EmployeeTable = ({ list }) => {
    const [activeColumn, setActiveColumn] = useState(null)
    console.log(list);

    const keys =
        !list.length ?
            []
            :
            [
                ...Object.keys(list[0]).filter(key => key !== "address"),
                ...Object.keys(list[0].address)
            ]

    return (
        <>
            <table className='employeeTable'>
                <thead>
                    <tr className='employeeTable__row--header'>
                        {keys?.map((key, index) =>
                            <th className='employeeTable__header-cell' key={`${key}${index}`}>
                                <h3 className='employeeTable__header-cell__title'>{key.toUpperCase()}</h3>
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
                        const stateAbbr = states.find(state => state.name === employee.address.state)?.abbreviation || employee.address.state;

                        // Construire les valeurs à afficher
                        const values = [
                            employee.firstName,
                            employee.lastName,
                            employee.birthDate,
                            employee.startDate,
                            employee.department,
                            employee.address.street,
                            employee.address.city,
                            stateAbbr,  // Remplace le nom par l'abréviation
                            employee.address.zipCode
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

