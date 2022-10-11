import "./style.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_BASE_URL } from "../../common/constants";
import ROUTES from "../../common/routes";
import { Toast } from "../../helpers/sweetAlert";
import { fetchDataWithBody } from "../../services/service";

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const onSubmit = (data) => {
    setLoading(true);
    const body = {
      jwt_id: id,
      otp: data.otp,
    };
    const url = `${SERVER_BASE_URL}api/admin/verify-otp`;
    fetchDataWithBody(url, body)
      .then((response) => {
        if (response.success === true) {
          setLoading(false);
          Toast.fire({
            icon: "success",
            title: response.message,
          });
          navigate(`${ROUTES.AUTH.RESET_PASSWORD.BASE}/${id}`);
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

  const handleResendOtp = () => {
    const body = {
      jwt_id: id,
    };
    const url = `${SERVER_BASE_URL}api/admin/resend-otp`;
    fetchDataWithBody(url, body)
      .then((response) => {
        if (response.success === true) {
          Toast.fire({
            icon: "success",
            title: response.message,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: response.message,
          });
        }
      })
      .catch((_error) => {
        Toast.fire({
          icon: "error",
          title: "Something went wrong! Category not created.",
        });
      });
  };

  return (
    <div className="auth box">
      <h3 className="text-center mb-4">Verify OTP</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-1">
          <input
            type="number"
            className="form-control"
            placeholder="Type OTP"
            {...register("otp", { required: true })}
          />
          <div className="form-control-icon">
            <i className="bi bi-123"></i>
          </div>
        </div>
        {errors.otp ? <p className="validation-error">OTP is required</p> : ""}
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
            Verify
          </button>
        )}
      </form>
      <div className="text-center mt-4 fs-6">
        <p className="text-gray-600">
          Doesn't receive OTP?
          <button
            type="button"
            className="app-link ms-1 text-decoration-underline"
            onClick={handleResendOtp}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
