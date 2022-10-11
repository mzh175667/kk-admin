import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_BASE_URL } from "../../common/constants";
import { fetchDataWithoutBody } from "../../services/service";

const initialState = {
  loading: false,
  employeesTimeTable: [],
  allEmployeesTimeTable: [],
  success: "",
  message: "",
};

export const GET_ALL_EMPLOYEES_TIME_TABLE = createAsyncThunk(
  "GetAllEmployeesTimeTable",
  async (data) => {
    try {
      const url = `${SERVER_BASE_URL}/api/timeTable?name=${
        data?.name ? data?.name : ""
      }&date=${data?.date ? Number(data?.date) : 17}`;
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
        state.employeesTimeTable = payload.data?.timeTable;
        state.allEmployeesTimeTable = payload.data?.allData;
      })
      .addCase(GET_ALL_EMPLOYEES_TIME_TABLE.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default employeesTimeTableSlice.reducer;
