import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../components/datatable";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import ROUTES from "../../common/routes";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_EMPLOYEES } from "../../reducers/employee/employeeSlice";
import { Toast } from "../../helpers/sweetAlert";
import { SERVER_BASE_URL } from "../../common/constants";
import { deleteDataFromBody } from "../../services/service";
import { CircularProgress } from "@material-ui/core";

const Employees = () => {
  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const { employees, success, loading } = useSelector(
    (state) => state.employee
  );
  useEffect(() => {
    dispatch(GET_ALL_EMPLOYEES());
    if (success === true) {
      manageState();
    }
  }, [employees.length]);

  const manageState = () => {
    const employees_data = employees.map((data, i) => {
      return {
        ...data,
        sr_no: i + 1,
      };
    });
    setEmployeesData(employees_data);
  };
  const columns = [
    {
      name: <b>Sr No</b>,
      selector: (row) => row.sr_no,
      sortable: true,
      reorder: true,
    },
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
    },
    {
      name: <b>Designation</b>,
      selector: (row) => row.designation,
      sortable: true,
      reorder: true,
    },
    {
      name: <b>Pin</b>,
      selector: (row) => row.pin,
      sortable: true,
      reorder: true,
    },

    {
      name: <b>Action</b>,
      button: true,
      cell: (row) => (
        <Link to={`${ROUTES.EMPLOYEES.UPDATE.BASE}/${row._id}`}>
          <IconButton color="primary">
            <Edit />
          </IconButton>
        </Link>
      ),
    },
  ];

  const deleteAll = (data) => {
    const employee_ids = data.map((dataItem) => {
      return dataItem._id;
    });
    const body = {
      employee_ids: employee_ids,
    };
    const url = `${SERVER_BASE_URL}/api/employee`;
    return deleteDataFromBody(url, body).then((response) => {
      if (response.success === true) {
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        dispatch(GET_ALL_EMPLOYEES());
        return true;
      } else {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        return false;
      }
    });
  };
  return (
    <>
      {!loading ? (
        <Datatable
          columns={columns}
          rows={employeesData}
          addBtnUrl={ROUTES.EMPLOYEES.ADD}
          delFunction={deleteAll}
          selectable={true}
        />
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <CircularProgress color="primary" />
        </div>
      )}
    </>
  );
};

export default Employees;
