import DatePicker from "react-datepicker";

export const DateInput = ({ id, selected, onChange }) => {
  return (
    <DatePicker
      id={id}
      selected={selected}
      onChange={onChange}
      dateFormat="MM/dd/yyyy"
      showYearDropdown
      scrollableYearDropdown
    />
  )
}