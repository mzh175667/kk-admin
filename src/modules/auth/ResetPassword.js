import "./style.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SERVER_BASE_URL } from "../../common/constants";
import ROUTES from "../../common/routes";
import { Toast } from "../../helpers/sweetAlert";
import { fetchDataWithBody } from "../../services/service";

const ResetPassword = () => {
  const yupValidation = Yup.object().shape({
    password: Yup.string()
      .required("Password is mendatory")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be maximum of 15 characters"),
  });
  const formOptions = { resolver: yupResolver(yupValidation) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const onSubmit = (data) => {
    setLoading(true);

    const body = { jwt_id: id, password: data.password };

    const url = `${SERVER_BASE_URL}api/admin/reset-password`;
    fetchDataWithBody(url, body)
      .then((response) => {
        if (response.success === true) {
          setLoading(false);
          Toast.fire({
            icon: "success",
            title: response.message,
          });
          navigate(ROUTES.AUTH.LOGIN);
        } else {
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
          title: "Something went wrong! Category not created.",
        });
      });
  };

  return (
    <div className="auth box">
      <h3 className="text-center mb-4">Reset Password</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-1">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
          <div className="form-control-icon">
            <i className="bi bi-envelope"></i>
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
            Reset
          </button>
        )}
      </form>
      <div className="text-center mt-4 fs-6">
        <p className="text-gray-600">
          Remember your account?
          <Link to={ROUTES.AUTH.LOGIN} className="app-link ms-2">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
