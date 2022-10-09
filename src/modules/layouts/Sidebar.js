import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hideSidebar,
  hideSidebarBackdrop,
  sidebarStatus,
} from "../../reducers/sidebarSlice";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ROUTES from "../../common/routes";
import SIDEBAR_MENUES from "../../common/sidebarMenues";
import kk_logo from "../../assets/images/logo/kklogo2.png";
const Sidebar = () => {
  const isSidebarShow = useSelector(sidebarStatus);
  const dispatch = useDispatch();
  const location = useLocation();

  const isSmallScreen = useMediaQuery({ query: "(max-width: 1198px)" });

  useEffect(() => {
    if (isSmallScreen === true) {
      dispatch(hideSidebarBackdrop());
      dispatch(hideSidebar());
    }
  }, [location.pathname, dispatch, isSmallScreen]);

  const hideSidebarHandler = () => {
    dispatch(hideSidebar());
    dispatch(hideSidebarBackdrop());
  };

  const sidebar = SIDEBAR_MENUES.map((nav, i) => {
    let item_paths = [];
    const items = nav.items.map((item, j) => {
      item_paths.push(item.to);
      return (
        <li
          className={`submenu-item ${
            location.pathname === item.to ? "active" : ""
          }`}
          key={`${i}${j}`}
        >
          <Link to={item.to} className="link">
            {item.text}
          </Link>
        </li>
      );
    });
    if (items.length > 0) {
      return (
        <li
          className={`sidebar-item has-sub ${
            item_paths.includes(location.pathname) === true ? "active" : ""
          }`}
          key={i}
        >
          <Link
            to={nav.to}
            className="sidebar-link"
            data-bs-toggle="collapse"
            data-bs-target={`#${nav.name}`}
          >
            <i className={nav.icon}></i>
            <span>{nav.text}</span>
          </Link>
          <ul
            id={nav.name}
            className={`submenu collapse ${
              item_paths.includes(location.pathname) === true ? "show" : ""
            }`}
          >
            {items}
          </ul>
        </li>
      );
    } else {
      return (
        <li
          className={`sidebar-item ${
            location.pathname === nav.to ? "active" : ""
          }`}
          key={i}
        >
          <Link to={nav.to} className="sidebar-link">
            <i className={nav.icon}></i>
            <span>{nav.text}</span>
          </Link>
        </li>
      );
    }
  });
  return (
    <div id="sidebar" className={isSidebarShow === true ? "active" : ""}>
      <div
        className="sidebar-wrapper"
        style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.07)" }}
      >
        <div className="sidebar-header position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <Link to={ROUTES.BASE}>
                {/* <img
                  src="https://res.cloudinary.com/dcwobtmhv/image/upload/v1661934762/logo_xbrhvw.svg"
                  alt="Logo"
                /> */}
                <img src={kk_logo} alt="Logo" width="100%" height="100%" />
              </Link>
            </div>
            <div className="sidebar-toggler x">
              <button
                type="button"
                className="sidebar-hide app-link d-xl-none d-block"
                onClick={hideSidebarHandler}
              >
                <i className="bi bi-x bi-middle theme-color"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu mt-0">{sidebar}</ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
