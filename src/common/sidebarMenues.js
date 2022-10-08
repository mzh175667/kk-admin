import ROUTES from "./routes";

const SIDEBAR_MENUES = [
  {
    name: "dashboard",
    to: ROUTES.BASE,
    icon: "bi bi-speedometer2",
    text: "Dashboard",
    items: [],
  },
  {
    name: "employees",
    to: ROUTES.EMPLOYEES.BASE,
    icon: "bi bi-grid-fill",
    text: "Employees",
    items: [
      {
        name: "add",
        to: ROUTES.EMPLOYEES.ADD,
        text: "Add",
      },
      {
        name: "view",
        to: ROUTES.EMPLOYEES.BASE,
        text: "View",
      },
    ],
  },
  {
    name: "timeTable",
    to: ROUTES.TIME_TABLE.DEVELOPERS.BASE,
    icon: "bi bi-clock-fill",
    text: "Time Table",
    items: [
      {
        name: "developers",
        to: ROUTES.TIME_TABLE.DEVELOPERS.BASE,
        text: "Developers",
      },
      {
        name: "internees",
        to: ROUTES.TIME_TABLE.INTERNEES.BASE,
        text: "Internees",
      },
    ],
  },
];

export default SIDEBAR_MENUES;
