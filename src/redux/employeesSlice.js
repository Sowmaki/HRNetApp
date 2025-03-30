import { createSlice } from '@reduxjs/toolkit';
import employees from "../mocks/employees_mock.json";

const initialState = {
  list: employees,
  query: '',
  listLength: 10,
  currentPage: 1,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.list.unshift(action.payload);
    },
    setQuery: (state, action) => {
      state.query = action.payload;
      state.currentPage = 1;
    },
    setListLength: (state, action) => {
      state.listLength = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addEmployee, setQuery, setListLength, setCurrentPage } = employeesSlice.actions;
export default employeesSlice.reducer;