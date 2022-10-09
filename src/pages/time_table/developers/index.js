import { useEffect, useState } from "react";
import Datatable from "../../../components/datatable";
import ROUTES from "../../../common/routes";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_EMPLOYEES } from "../../../reducers/employee/employeeSlice";
import { Toast } from "../../../helpers/sweetAlert";
import { SERVER_BASE_URL } from "../../../common/constants";
import { deleteDataFromBody } from "../../../services/service";
import { GET_ALL_EMPLOYEES_TIME_TABLE } from "../../../reducers/timeTable/timeTableSlice";
import SearchBar from "../../../components/searchBar";
const Developers = () => {
  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const { employeesTimeTable, success } = useSelector(
    (state) => state.employeeTimeTable
  );
  console.log(employeesTimeTable);
  useEffect(() => {
    dispatch(GET_ALL_EMPLOYEES_TIME_TABLE({ name, date }));
    if (success === true) {
      manageState();
    }
  }, [employeesTimeTable]);
  const manageState = () => {
    let developers;
    if ((name && date) || name) {
      developers = employeesTimeTable.filter(
        (item) => item?.designation == "developer"
      );
    } else if (date || (!date && !name)) {
      developers = employeesTimeTable.filter(
        (item) => item?.employeeId?.designation == "developer"
      );
    }
    if (developers) {
      const employees_data = developers.map((data, i) => {
        return {
          ...data,
          sr_no: i + 1,
        };
      });
      setEmployeesData(employees_data);
    }
  };
  const deleteAll = (data) => {
    const timeTable_ids = data.map((dataItem) => {
      return dataItem._id;
    });
    const body = {
      timeTable_ids: timeTable_ids,
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
  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const daysHandleChange = (e) => {
    setDate(e.target.value);
  };
  let columns;
  if ((name && date) || name) {
    columns = [
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
        name: <b>Date</b>,
        selector: (row) => row.employeeId.date,
        sortable: true,
        reorder: true,
      },
      {
        name: <b>CheckIn Time</b>,
        selector: (row) => row.employeeId.checkInTime,
        sortable: true,
        reorder: true,
      },
      {
        name: <b>CheckOut Time</b>,
        selector: (row) =>
          row.employeeId.checkOutTime ? row.employeeId.checkOutTime : "pending",
        sortable: true,
        reorder: true,
      },
    ];
  } else if (date || (!date && !name)) {
    columns = [
      {
        name: <b>Sr No</b>,
        selector: (row) => row.sr_no,
        sortable: true,
        reorder: true,
      },
      {
        name: <b>Name</b>,
        selector: (row) => row.employeeId.name,
        sortable: true,
        reorder: true,
      },
      {
        name: <b>Date</b>,
        selector: (row) => row.date,
        sortable: true,
        reorder: true,
      },
      {
        name: <b>CheckIn Time</b>,
        selector: (row) => row.checkInTime,
        sortable: true,
        reorder: true,
      },
      {
        name: <b>CheckOut Time</b>,
        selector: (row) => (row.checkOutTime ? row.checkOutTime : "pending"),
        sortable: true,
        reorder: true,
      },
    ];
  }

  return (
    <>
      <SearchBar
        handleNameInput={handleNameInput}
        name={name}
        daysHandleChange={daysHandleChange}
        date={date}
      />

      <Datatable
        columns={columns}
        rows={employeesData}
        selectable={true}
        delFunction={deleteAll}
      />
    </>
  );
};

export default Developers;
