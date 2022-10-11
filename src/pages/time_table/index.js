import Datatable from "../../components/datatable";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../helpers/sweetAlert";
import { SERVER_BASE_URL } from "../../common/constants";
import { deleteDataFromBody } from "../../services/service";
import SearchBar from "../../components/searchBar";
import { useEffect, useState } from "react";
import { GET_ALL_EMPLOYEES_TIME_TABLE } from "../../reducers/timeTable/timeTableSlice";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";
const TimeTable = ({
  developer,
  internee,
  checkInNotifications,
  checkOutNotifications,
}) => {
  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const { employeesTimeTable, allEmployeesTimeTable, loading, success } =
    useSelector((state) => state.employeeTimeTable);
  console.log("employeesTimeTable", employeesTimeTable);
  console.log("name", name);
  useEffect(() => {
    dispatch(GET_ALL_EMPLOYEES_TIME_TABLE({ name, date }));
    if (success === true) {
      manageState();
    }
  }, [
    employeesTimeTable.length,
    date,
    name,
    checkInNotifications,
    checkOutNotifications,
  ]);
  useEffect(() => {
    dispatch(GET_ALL_EMPLOYEES_TIME_TABLE({ name, date }));
    if (success === true) {
      manageState();
    }
  }, [name, date]);
  const manageState = () => {
    // console.log(name);
    let internees, developers, employees_data;
    if (internee) {
      if ((name && date) || name) {
        internees = employeesTimeTable.filter(
          (item) => item?.designation == "internee"
        );
      } else if (date || (!date && !name)) {
        internees = employeesTimeTable.filter(
          (item) => item?.employeeId?.designation == "internee"
        );
        employees_data = internees.map((data, i) => {
          return {
            ...data,
            sr_no: i + 1,
          };
        });
      }
    } else if (developer) {
      if ((name && date) || name) {
        developers = employeesTimeTable.filter(
          (item) => item?.designation == "developer"
        );
      } else if (date || (!date && !name)) {
        developers = employeesTimeTable.filter(
          (item) => item?.employeeId?.designation == "developer"
        );
      }
      employees_data = developers.map((data, i) => {
        return {
          ...data,
          sr_no: i + 1,
        };
      });
    }

    setEmployeesData(employees_data);
  };
  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleDaysChange = (e) => {
    setDate(e.target.value);
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
        dispatch(GET_ALL_EMPLOYEES_TIME_TABLE({ name, date }));
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
        selector: (row) => moment(row.employeeId.createdAt).format("L"),
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
          row.employeeId.checkOutTime
            ? row.employeeId.checkOutTime
            : "At office",
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
        selector: (row) => moment(row.employeeId.createdAt).format("L"),
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
        selector: (row) => (row.checkOutTime ? row.checkOutTime : "At office"),
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
        handleDaysChange={handleDaysChange}
        date={date}
      />
      {!loading ? (
        <Datatable
          columns={columns}
          rows={employeesData}
          selectable={true}
          delFunction={deleteAll}
        />
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <CircularProgress color="primary" />
        </div>
      )}
    </>
  );
};

export default TimeTable;
