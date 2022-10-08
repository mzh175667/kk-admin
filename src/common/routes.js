const ROUTES = {
  BASE: "/",
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    VERIFY_OTP: {
      BASE: "/verify-otp",
      PARAM: "/verify-otp/:id",
    },
    RESET_PASSWORD: {
      BASE: "/reset-password",
      PARAM: "/reset-password/:id",
    },
    CHANGE_PASSWORD: "/change-password",
    PROFILE: "/profile",
  },
  EMPLOYEES: {
    BASE: "/employees",
    ADD: "/employee/add",
    UPDATE: {
      BASE: "/employee/update",
      PARAM: "/employee/update/:id",
    },
    DELETE: {
      BASE: "/employee/delete",
      PARAM: "/employee/delete/:id",
    },
  },
  TIME_TABLE: {
    DEVELOPERS: {
      BASE: "/developers",
      VIEW: {
        BASE: "/developer/view",
        PARAM: "/developer/view/:id",
      },
      DELETE: {
        BASE: "/developer/delete",
        PARAM: "/developer/delete/:id",
      },
    },
    INTERNEES: {
      BASE: "/internees",
      VIEW: {
        BASE: "/internee/view",
        PARAM: "/internee/view/:id",
      },
      DELETE: {
        BASE: "/internee/delete",
        PARAM: "/internee/delete/:id",
      },
    },
  },

  ERROR: "*",
};

export default ROUTES;
