import "./Layouts.scss";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  hideSidebar,
  hideSidebarBackdrop,
  showSidebar,
  showSidebarBackdrop,
} from "../../reducers/sidebarSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, userDetail } from "../../reducers/authSlice";
import ROUTES from "../../common/routes";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(userDetail);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 1198px)" });

  useEffect(() => {
    dispatch(hideSidebarBackdrop());
    if (isSmallScreen === true) {
      dispatch(hideSidebar());
    } else {
      dispatch(showSidebar());
    }
  }, [isSmallScreen, dispatch]);

  const showSidebarHandler = () => {
    if (isSmallScreen === true) {
      dispatch(showSidebarBackdrop());
    }
    dispatch(showSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="mb-2 header d-flex">
      <button
        type="button"
        onClick={showSidebarHandler}
        className="burger-btn app-link d-block d-xl-none "
      >
        <i className="bi bi-justify theme-color fs-3"></i>
      </button>
      <div className="dropdown ms-auto">
        <button
          type="button"
          className=" avatar-btn dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <img
            src="data:image/png;base64,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"
            alt="Avatar Logo"
            className="rounded-pill avatar"
          />
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link to={ROUTES.AUTH.PROFILE} className="dropdown-item">
              Profile
            </Link>
          </li>
          <li>
            <Link to={ROUTES.AUTH.CHANGE_PASSWORD} className="dropdown-item">
              Change Password
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="dropdown-item"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
