import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMeAuth, userDetail } from "../../reducers/authSlice";
import "./style.scss";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SERVER_BASE_URL } from "../../common/constants";
import { Toast } from "../../helpers/sweetAlert";
import { fetchDataWithBody } from "../../services/service";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector(userDetail);
  const [image, setImage] = useState(user.image);
  const inputRef = useRef(null);

  const yupValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email is mendatory")
      .email("Email is invalid"),
    name: Yup.string().required("Name is mendatory"),
  });
  const formOptions = { resolver: yupResolver(yupValidation) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const onClickFileUpload = () => {
    inputRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((data) => setImage(data));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const url = `${SERVER_BASE_URL}api/admin/profile-update`;
    const response = await fetchDataWithBody(url, data);
    if (response.success === true) {
      dispatch(isMeAuth({ user: response.data }));
      setLoading(false);
      Toast.fire({
        icon: "success",
        title: response.message,
      });
    } else {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: response.message,
      });
    }
  };

  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = user.name;
    defaultValues.email = user.email;
    reset({ ...defaultValues });
  }, [reset, user.name, user.email]);

  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <h3>Profile</h3>
      <div className="col-sm-5 form-group mb-3">
        <img className="profile-img" src={image} alt="Avatar" width="100%" />
        <button
          type="button"
          className="btn theme-btn btn-block mt-3"
          onClick={onClickFileUpload}
        >
          Change
        </button>
        <input
          type="file"
          ref={inputRef}
          className="d-none"
          onChange={handleImageUpload}
        />
      </div>
      <div className="col-sm-7 my-auto">
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" {...register("name")} />
          {errors.name ? (
            <p className="validation-error">{errors.name?.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" {...register("email")} />
          {errors.email ? (
            <p className="validation-error">{errors.email?.message}</p>
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
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default Profile;
