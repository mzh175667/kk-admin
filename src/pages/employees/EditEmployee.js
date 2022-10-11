import { SERVER_BASE_URL } from "../../common/constants";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../common/routes";
import BackButton from "../../components/back_button/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_EMPLOYEES_DATA } from "../../reducers/employee/employeeSlice";
import { fetchDataWithoutBody } from "../../services/service";

const EditCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [designation, setDesignation] = useState("");
  const [designationValidation, setDesignationValidation] = useState(false);
  const [response, setResponse] = useState("");

  const { id } = useParams();
  const { success, loading } = useSelector((state) => state.employee);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const url = `${SERVER_BASE_URL}/api/employee/${id}`;
    fetchDataWithoutBody(url).then((response) => {
      if (response.success === true) {
        let defaultValues = {};
        setResponse(response.data.employee.designation);
        defaultValues.employee_name = response.data.employee.name;
        // defaultValues.designation = response.data.employee.designation;
        reset({ ...defaultValues });
      }
    });
  }, [id, reset]);

  const onSubmit = async (data) => {
    let body = {
      name: data.employee_name,
      designation: designation,
    };

    setDesignationValidation(true);
    if (designation) {
      const url = `${SERVER_BASE_URL}/api/employee/${id}`;
      dispatch(UPDATE_EMPLOYEES_DATA({ url, body }));
      if (success == true) {
        navigate(ROUTES.EMPLOYEES.BASE);
        setDesignationValidation(false);
      }
    }
  };
  const designationHandleChange = (e) => {
    setDesignation(e.target.value);
  };
  return (
    <>
      <BackButton url={ROUTES.EMPLOYEES.BASE} />
      <h4>Edit Employee</h4>
      <form className="row mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6 form-group">
          <label>
            Employee Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Employee Name"
            {...register("employee_name", { required: true })}
          />
          {errors.employee_name ? (
            <p className="validation-error">Employee name is required</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-sm-6 mb-3">
          <label htmlFor="desination">Designation</label>
          <select
            className="form-select mt-2"
            value={designation}
            onChange={designationHandleChange}
          >
            <option value="">Choose designation...</option>
            <option value="developer">developer</option>
            <option value="internee">internee</option>
          </select>
          {(errors.designation || designation == "") &&
          designationValidation ? (
            <p className="validation-error">designation is required</p>
          ) : (
            ""
          )}
        </div>

        <div className="col-sm-12 d-flex justify-content-end">
          {loading === true ? (
            <button
              type="submit"
              className="btn btn-primary me-1 mb-1 theme-btn"
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
              className="btn btn-primary me-1 mb-1 theme-btn"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default EditCategory;
