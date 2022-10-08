import { SERVER_BASE_URL } from "../common/constants";
import { fetchDataWithBody, fetchDataWithoutBody } from "../services/service";

const login = async (body) => {
  const url = `${SERVER_BASE_URL}/api/auth/login`;
  return fetchDataWithBody(url, "POST", body);
};

const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", data?.token);
    next();
  }
};

const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("access_token")) {
    return JSON.parse(localStorage.getItem("access_token"));
  } else {
    return false;
  }
};

const me = async () => {
  const url = `${SERVER_BASE_URL}/api/admin/me`;
  return fetchDataWithoutBody(url, "GET");
};

export { login, authenticate, isAuthenticated, me };
