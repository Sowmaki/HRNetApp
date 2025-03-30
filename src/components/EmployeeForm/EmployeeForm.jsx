import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { departments } from "../../data/departments";
import { states } from "../../data/states";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Modal } from "../Modal/Modal";
import "./EmployeeForm.scss";

export const EmployeeForm = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const fullStates = states.map((state) => state.name);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    department: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Mise à jour des champs liés à des states
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      department: selectedDepartment,
      state: selectedState,
    }));
  }, [dateOfBirth, startDate, selectedDepartment, selectedState]);

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee(formData));
    setOpenModal(true);

    // Réinitialisation du formulaire
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      startDate: "",
      department: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    });
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
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(formatDate(date))}
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
          <input id="street" type="text" name="street" value={formData.street} onChange={handleChange} required />

          <label htmlFor="city">City</label>
          <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} required />

          <label htmlFor="state">State</label>
          <DropdownMenu options={fullStates} onSelect={setSelectedState} />

          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
        </fieldset>
        <label htmlFor="department">Department</label>
        <DropdownMenu options={departments} onSelect={setSelectedDepartment} />
        <button type="submit" className="employeeForm__validate-btn button">Save</button>
      </form>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </>
  )
}