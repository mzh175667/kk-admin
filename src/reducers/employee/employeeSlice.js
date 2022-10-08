import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_BASE_URL } from "../../common/constants";
import {
  fetchDataWithBody,
  fetchDataWithBodyAndToast,
  fetchDataWithoutBody,
} from "../../services/service";
import axios from "axios";
import { toUpperCase } from "../../utils/utility";

const initialState = {
  loading: false,
  employee: [],
  employees: [],
  success: "",
  message: "",
  deleted_employees: {},
  updatedEmployee: {},
};

export const ADD_EMPLOYEE = createAsyncThunk(
  "CreateNewEmployee",
  async (body) => {
    try {
      return await fetchDataWithBodyAndToast(
        `${SERVER_BASE_URL}/api/employee`,
        body
      );
    } catch (error) {
      return error;
    }
  }
);
export const GET_ALL_EMPLOYEES = createAsyncThunk(
  "GetAllEmployees",
  async () => {
    try {
      return fetchDataWithoutBody(`${SERVER_BASE_URL}/api/employees`);
    } catch (error) {
      return error;
    }
  }
);

export const UPDATE_EMPLOYEES_DATA = createAsyncThunk(
  "UpdateEmployee",
  async ({ url, body }, { dispatch }) => {
    try {
      const response = await axios.put(url, body);
      console.log("response", response);
      if (response.data.data.success === "true") dispatch(GET_ALL_EMPLOYEES());

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ADD_EMPLOYEE.pending, (state) => {
        state.loading = true;
      })
      .addCase(ADD_EMPLOYEE.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.message = payload.message;
        state.employee = payload;
      })
      .addCase(ADD_EMPLOYEE.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GET_ALL_EMPLOYEES.pending, (state) => {
        state.loading = true;
      })
      .addCase(GET_ALL_EMPLOYEES.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.message = payload.message;
        state.employees = payload.data;
      })
      .addCase(GET_ALL_EMPLOYEES.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UPDATE_EMPLOYEES_DATA.pending, (state) => {
        state.loading = true;
      })
      .addCase(UPDATE_EMPLOYEES_DATA.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.message = payload.message;
        state.updatedEmployee = payload.data;
      })
      .addCase(UPDATE_EMPLOYEES_DATA.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default employeeSlice.reducer;
