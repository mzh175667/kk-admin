import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../common/routes";
import BackButton from "../../components/back_button/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_EMPLOYEE } from "../../reducers/employee/employeeSlice";

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [designation, setDesignation] = useState("");
  const [designationValidation, setDesignationValidation] = useState(false);
  const { successMessage, employee, employees, loading } = useSelector(
    (state) => state.employee
  );
  console.log(employees);
  // useEffect(() => {
  //   if (employees && employee && successMessage) employees.insert(0, employee);
  // }, [employee.length]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setDesignationValidation(true);
    const body = {
      name: data.employee_name,
      email: data.email,
      designation: designation,
    };
    dispatch(CREATE_EMPLOYEE(body));

    if (employee && successMessage && designation) {
      setDesignationValidation(false);
    }
  };
  useEffect(() => {
    if (employee && successMessage && designation) {
      navigate(ROUTES.EMPLOYEES.BASE);
    }
  }, [employee, successMessage]);
  const designationHandleChange = (e) => {
    setDesignation(e.target.value);
  };
  return (
    <>
      <BackButton url={ROUTES.EMPLOYEES.BASE} />
      <h4>Add Employee</h4>
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
        <div className="col-md-6 form-group">
          <label>
            Email <span className="text-danger">*</span>
          </label>
          <input
            className="form-control mt-2"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email ? (
            <p className="validation-error">email is required</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-sm-6 mb-3">
          <label htmlFor="seller">Designation</label>
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
              className="btn me-1 mb-1 theme-btn"
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
            <button type="submit" className="btn me-1 mb-1 theme-btn">
              Add
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AddCategory;
