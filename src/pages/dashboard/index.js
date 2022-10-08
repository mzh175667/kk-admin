import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../common/routes";
import { GET_ALL_EMPLOYEES } from "../../reducers/employee/employeeSlice";
import Statistics from "./Statistics";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);
  const [sum, setSum] = useState({
    sellers: 0,
    buyers: 0,
    categories: 0,
    services: 0,
  });
  let developer, intrnees;

  useEffect(() => {
    dispatch(GET_ALL_EMPLOYEES());
  }, []);
  developer = employees.filter((item) => item.designation == "developer");
  intrnees = employees.filter((item) => item.designation == "intrnees");

  const statistics = [
    {
      text: "Employees",
      sum: employees.length,
      icon: "iconly-boldProfile",
      icon_color: "green",
      url: ROUTES.BASE,
    },
    {
      text: "Developers",
      sum: developer.length,
      icon: "iconly-boldProfile",
      icon_color: "blue",
      url: ROUTES.BASE,
    },
    {
      text: "Internees",
      sum: intrnees.length,
      icon: "iconly-boldProfile",
      icon_color: "green",
      url: ROUTES.BASE,
    },
  ];

  return (
    <div className="page-content">
      <h3 className="mb-4">Profile Statistics</h3>
      <div className="row">
        {statistics.map((stat, i) => {
          return (
            <div className="col-md-4 col-12" key={i}>
              <Statistics stat={stat} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
