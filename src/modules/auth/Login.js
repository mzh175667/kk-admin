import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { SERVER_BASE_URL } from "../../common/constants";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFail,
  loginPending,
  loginSuccess,
} from "../../reducers/authSlice";
import ROUTES from "../../common/routes";
import { Toast } from "../../helpers/sweetAlert";
import { fetchDataWithBody } from "../../services/service";

const Login = () => {
  const yupValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email is mendatory")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is mendatory")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be maximum of 15 characters"),
  });
  const formOptions = { resolver: yupResolver(yupValidation) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(loginPending());

    const url = `${SERVER_BASE_URL}/api/admin/login`;
    fetchDataWithBody(url, data)
      .then((response) => {
        if (response.success === true) {
          dispatch(loginSuccess({ data: response }));
          setLoading(false);
          Toast.fire({
            icon: "success",
            title: response.message,
          });
          navigate(ROUTES.BASE)
        } else {
          const error = response.message;
          dispatch(loginFail({ error }));
          setLoading(false);
          Toast.fire({
            icon: "error",
            title: response.message,
          });
        }
      })
      .catch((_error) => {
        setLoading(false);
        Toast.fire({
          icon: "error",
          title: "Something went wrong! User not created.",
        });
      });
  };

  return (
    <div className="auth box">
      <h3 className="text-center mb-3">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            {...register("email")}
          />
          <div className="form-control-icon">
            <i className="bi bi-person"></i>
          </div>
        </div>
        {errors.email ? (
          <p className="validation-error">{errors.email?.message}</p>
        ) : (
          ""
        )}
        <div className="form-group position-relative has-icon-left mb-1 mt-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
          <div className="form-control-icon">
            <i className="bi bi-shield-lock"></i>
          </div>
        </div>
        {errors.password ? (
          <p className="validation-error">{errors.password?.message}</p>
        ) : (
          ""
        )}

        {loading === true ? (
          <button
            type="submit"
            className="btn theme-btn btn-block shadow-lg mt-3"
            disabled="disabled"
          >
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="btn theme-btn btn-block shadow-lg mt-3"
          >
            Log in
          </button>
        )}
      </form>
      <div className="text-center mt-4 fs-6">
        <Link to={ROUTES.AUTH.FORGOT_PASSWORD} className="app-link">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
