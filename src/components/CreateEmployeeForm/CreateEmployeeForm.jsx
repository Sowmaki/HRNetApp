import { useContext, useEffect, useState } from "react";
import { EmployeesContext } from "../../context/EmployeesContext";
import { departments } from "../../data/departments";
import { states } from "../../data/states";
import { Modal } from "../Modal/Modal";


export const CreateEmployeeForm = () => {

  const { addEmployee } = useContext(EmployeesContext);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setOpenModal(true)
  }, [])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    department: "",
    adress: {
      street: "",
      city: "",
      state: "",
      zipCode: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target

    if (["street", "city", "state", "zipCode"].includes(name)) {
      setFormData({
        ...formData,
        adress: {
          ...formData.adress,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(formData); // Ajoute l'employé au contexte

    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      startDate: "",
      department: "",
      adress: {
        street: "",
        city: "",
        state: "",
        zipCode: 0,
      },
    });

    console.log('employé ajouté!');
    setOpenModal(true)
  };

  return (
    //Ajouter des required pour les champs obligatoires
    <>
      <form action="POST" className="employeeForm" onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} required />

        {/* Modifier les formats de date en MM/JJ/AAAA */}
        <label htmlFor="date-of-birth">Date of Birth</label>
        <input id="date-of-birth" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />

        <label htmlFor="start-date">Start Date</label>
        <input id="start-date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <fieldset className="employeeForm__address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" name="street" value={formData.adress.street} onChange={handleChange} required />

          <label htmlFor="city">City</label>
          <input id="city" type="text" name="city" value={formData.adress.city} onChange={handleChange} required />

          <label htmlFor="state">State</label>
          <select className="employeeForm__select" name="state" id="state" onChange={handleChange} required>
            {/* On mappe sur la liste des Etats et creer pour chacun balise option */}
            <option disabled selected>Select state</option>
            {states.map((state, index) => <option key={`${state}${index}`}>{state.name}</option>)}
          </select>

          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" pattern="\d{5}" name="zipCode" value={formData.adress.zipCode} onChange={handleChange} required />
          {/* Ajout limite de chiffres */}
        </fieldset>
        <label htmlFor="department">Department</label>
        <select className="employeeForm__select" name="department" id="department" onChange={handleChange}>
          {/* On mappe sur les departements pour creer chaque option */}
          <option disabled selected>Select department</option>
          {departments.map((department, index) => <option key={`${department}${index}`}>{department}</option>)}
        </select>
        <button type="submit" className="employeeForm__validate-btn">Save</button>
      </form>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </>
  )
}