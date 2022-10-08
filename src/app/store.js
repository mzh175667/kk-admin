import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import employeeSlice from "../reducers/employee/employeeSlice";
import sidebarReducer from "../reducers/sidebarSlice";
import employeesTimeTableSlice from "../reducers/timeTable/timeTableSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    employee: employeeSlice,
    employeeTimeTable: employeesTimeTableSlice,
  },
});
