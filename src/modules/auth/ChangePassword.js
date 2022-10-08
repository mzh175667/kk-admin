import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/authSlice";
import "./style.scss";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SERVER_BASE_URL } from "../../common/constants";
import { Toast } from "../../helpers/sweetAlert";
import { fetchDataWithBody } from "../../services/service";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const yupValidation = Yup.object().shape({
    old_password: Yup.string()
      .required("Old Password is mendatory")
      .min(8, "Old Password must be at least 8 characters")
      .max(15, "Old Password must be maximum of 15 characters"),
    new_password: Yup.string()
      .required("New Password is mendatory")
      .min(8, "New Password must be at least 8 characters")
      .max(15, "New Password must be maximum of 15 characters"),
    confirm_password: Yup.string()
      .required("Confirm Password is mendatory")
      .min(8, "Confirm Password must be at least 8 characters")
      .max(15, "Confirm Password must be maximum of 15 characters")
      .oneOf(
        [Yup.ref("new_password"), null],
        "Confirm password must match with password"
      ),
  });
  const formOptions = { resolver: yupResolver(yupValidation) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    setLoading(true);
    const url = `${SERVER_BASE_URL}api/admin/change-password`;
    const response = await fetchDataWithBody(url, data);
    if (response.success === true) {
      setLoading(false);
      Toast.fire({
        icon: "success",
        title: response.message,
      });
      dispatch(logout());
    } else {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: response.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container-fluid">
      <h3 className="mb-4">Change Password</h3>
      <div className="form-group">
        <label>Old Password</label>
        <input
          type="password"
          className="form-control"
          {...register("old_password")}
        />
        {errors.old_password ? (
          <p className="validation-error">{errors.old_password?.message}</p>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          {...register("new_password")}
        />
        {errors.new_password ? (
          <p className="validation-error">{errors.new_password?.message}</p>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          {...register("confirm_password")}
        />
        {errors.confirm_password ? (
          <p className="validation-error">{errors.confirm_password?.message}</p>
        ) : (
          ""
        )}
      </div>

      {loading === true ? (
        <button
          type="submit"
          className="btn me-1 mb-1 theme-btn float-end"
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
        <button type="submit" className="btn me-1 mb-1 theme-btn float-end">
          Change Password
        </button>
      )}
    </form>
  );
};

export default ChangePassword;
