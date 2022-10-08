import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_BASE_URL } from "../../common/constants";
import { fetchDataWithoutBody } from "../../services/service";

const initialState = {
  loading: false,
  employeesTimeTable: [],
  allEmployeesTimeTable: [],
  success: "",
  searchBar: false,
  message: "",
};

export const GET_ALL_EMPLOYEES_TIME_TABLE = createAsyncThunk(
  "GetAllEmployeesTimeTable",
  async (name) => {
    try {
      const url = `${SERVER_BASE_URL}/api/timeTable?name=${
        name?.name ? name?.name : ""
      }&date=${name?.date ? Number(name?.date) : 10}`;
      return fetchDataWithoutBody(url);
    } catch (error) {
      return error;
    }
  }
);

export const employeesTimeTableSlice = createSlice({
  name: "employeesTimeTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GET_ALL_EMPLOYEES_TIME_TABLE.pending, (state) => {
        state.loading = true;
      })
      .addCase(GET_ALL_EMPLOYEES_TIME_TABLE.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.message = payload.message;
        state.searchBar = true;
        state.employeesTimeTable = payload.data?.timeTable;
        state.allEmployeesTimeTable = payload.data?.allData;
      })
      .addCase(GET_ALL_EMPLOYEES_TIME_TABLE.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default employeesTimeTableSlice.reducer;
