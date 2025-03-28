import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EmployeesContext } from "../../context/EmployeesContext";
import { departments } from "../../data/departments";
import { states } from "../../data/states";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Modal } from "../Modal/Modal";
import "./CreateEmployeeForm.scss";

export const CreateEmployeeForm = () => {

  const { addEmployee } = useContext(EmployeesContext);
  const [openModal, setOpenModal] = useState(false)
  const [selectedState, setSelectedState] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [startDate, setStartDate] = useState(null)
  const [birthDate, setBirthDate] = useState(null)

  const fullStates = states.map((state) => state.name)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    department: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target

    if (["street", "city", "zipCode"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value, // Mise à jour correcte des champs d'addresse
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Mise à jour de `birthDate`, `startDate`, et `department` directement
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      birthDate: birthDate, // Assigne la date directement
      startDate: startDate,
      department: selectedDepartment,
      address: {
        ...prevData.address,
        state: selectedState, // Met à jour state correctement
      },
    }));
  }, [birthDate, startDate, selectedDepartment, selectedState]); // Exécute la mise à jour à chaque changement

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(formData); // Ajoute l'employé au contexte

    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      startDate: { startDate },
      department: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: 0,
      },
    });

    setOpenModal(true)
  };

  const formatDate = (date) => {
    return date
      ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(date))
      : "";
  };


  return (
    //Ajouter des required pour les champs obligatoires
    <>
      <form action="POST" className="employeeForm" onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <DatePicker
          id="date-of-birth"
          selected={birthDate}
          onChange={(date) => setBirthDate(formatDate(date))}
          dateFormat="MM/dd/yyyy"
          showYearDropdown
          scrollableYearDropdown
        />

        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(formatDate(date))}
          dateFormat="MM/dd/yyyy"
          showYearDropdown
          scrollableYearDropdown
        />

        <fieldset className="employeeForm__address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" name="street" value={formData.address.street} onChange={handleChange} required />

          <label htmlFor="city">City</label>
          <input id="city" type="text" name="city" value={formData.address.city} onChange={handleChange} required />

          <label htmlFor="state">State</label>
          <DropdownMenu options={fullStates} onSelect={setSelectedState} />

          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="text" minLength={5} maxLength={5} name="zipCode" value={formData.address.zipCode} onChange={handleChange} required />
        </fieldset>
        <label htmlFor="department">Department</label>
        <DropdownMenu options={departments} onSelect={setSelectedDepartment} />
        <button type="submit" className="employeeForm__validate-btn button">Save</button>
      </form>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </>
  )
}