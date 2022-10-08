import { useEffect, useState } from "react";
import Datatable from "../../../components/datatable";
import ROUTES from "../../../common/routes";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_EMPLOYEES } from "../../../reducers/employee/employeeSlice";
import { Toast } from "../../../helpers/sweetAlert";
import { SERVER_BASE_URL } from "../../../common/constants";
import { deleteDataFromBody } from "../../../services/service";
import SearchBar from "../../../components/searchBar";
const Internees = () => {
  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const { employeesTimeTable, success } = useSelector(
    (state) => state.employee
  );
  useEffect(() => {
    dispatch(GET_ALL_EMPLOYEES());
    if (success === true) {
      manageState();
    }
  }, [employeesTimeTable.length]);
  const manageState = () => {
    const internees = employeesTimeTable.filter(
      (item) => item.designation == "internee"
    );
    const employees_data = internees.map((data, i) => {
      return {
        ...data,
        sr_no: i + 1,
      };
    });
    setEmployeesData(employees_data);
  };
  const deleteAll = (data) => {
    const employee_ids = data.map((dataItem) => {
      return dataItem._id;
    });
    const body = {
      employee_ids: employee_ids,
    };
    const url = `${SERVER_BASE_URL}/api/timeTable`;
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
  ];

  return (
    <>
      <SearchBar />
      <Datatable
        columns={columns}
        rows={employeesData}
        selectable={true}
        delFunction={deleteAll}
      />
    </>
  );
};

export default Internees;
