import { lazy, useEffect, useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { isAuthStatus, isMeAuth } from "./reducers/authSlice";
import { me } from "./helpers/auth";
import ROUTES from "./common/routes";
import { io } from "socket.io-client";
import { Toast } from "./helpers/sweetAlert";
import { SERVER_BASE_URL } from "./common/constants";
import { fetchDataWithoutBody } from "./services/service";
const Layout = lazy(() => import("./modules/Layout"));
const SplashScreen = lazy(() => import("./modules/layouts/SplashScreen"));
const ErrorPage404 = lazy(() => import("./modules/errors/ErrorPage404"));
const Login = lazy(() => import("./modules/auth/Login"));
const ForgotPassword = lazy(() => import("./modules/auth/ForgotPassword"));
const VerifyOtp = lazy(() => import("./modules/auth/VerifyOtp"));
const ResetPassword = lazy(() => import("./modules/auth/ResetPassword"));
const Profile = lazy(() => import("./modules/auth/Profile"));
const ChangePassword = lazy(() => import("./modules/auth/ChangePassword"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Employees = lazy(() => import("./pages/employees"));
const CreateEmployees = lazy(() => import("./pages/employees/CreateEmployee"));
const EditEmployee = lazy(() => import("./pages/employees/EditEmployee"));
const Developers = lazy(() => import("./pages/time_table/developers/index"));
const Internees = lazy(() => import("./pages/time_table/internees/index"));
export default function RoutesPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isAuthFlag, setIsAuthFlag] = useState(false);
  const [checkInNotifications, setCheckInNotifications] = useState([]);
  const [checkOutNotifications, setCheckOutNotifications] = useState([]);
  const [getCheckInCheckOutData, setGetCheckInCheckOutData] = useState([]);
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const isAuth = useSelector(isAuthStatus);
  const socket = io.connect("https://kk-time-table-server.herokuapp.com");
  // set notifications
  useEffect(() => {
    socket.on("get_checkin_notification", (data) => {
      setCheckInNotifications(data.data);
      setGetCheckInCheckOutData(data.data);
      setCheckOut(false);
      setCheckIn(true);
    });
  }, []);
  useEffect(() => {
    socket.on("get_checkout_notification", (data) => {
      setCheckOutNotifications(data.data);
      setGetCheckInCheckOutData(data.data);
      setCheckIn(false);
      setCheckOut(true);
    });
  }, []);
  useEffect(() => {
    if (checkIn || checkOut) {
      let url;
      if (checkIn) {
        url = `${SERVER_BASE_URL}/api/employee/${checkInNotifications.employeeId}`;
      } else if (checkOut) {
        url = `${SERVER_BASE_URL}/api/employee/${checkOutNotifications.employeeId}`;
      }
      fetchDataWithoutBody(url).then((response) => {
        if (response.success == true) {
          const audio = new Audio(
            "https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7"
          );
          audio.addEventListener("canplaythrough", (event) => {
            audio.play();
          });
          setTimeout(() => {
            if (checkOut) {
              Toast.fire({
                icon: "success",
                title: `${response.data.employee.name}: out of office`,
              });
            } else if (checkIn) {
              Toast.fire({
                icon: "success",
                title: `${response.data.employee.name}: In office`,
              });
            }
          }, [1000]);
        }
      });
    }
  }, [getCheckInCheckOutData]);
  useEffect(() => {
    setLoading(true);
    try {
      me().then((response) => {
        setIsAuthFlag(true);
        if (response?.success === true) {
          const user = response.data;
          dispatch(isMeAuth({ user }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    }
  }, [dispatch]);
  if (loading === true || isAuthFlag === false) {
    return <SplashScreen />;
  } else {
    return (
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          <Route
            path={ROUTES.BASE}
            element={isAuth ? <Layout /> : <Navigate to={ROUTES.AUTH.LOGIN} />}
          >
            <Route index element={<Dashboard />} />
            <Route path={ROUTES.AUTH.PROFILE} element={<Profile />} />
            <Route
              path={ROUTES.AUTH.CHANGE_PASSWORD}
              element={<ChangePassword />}
            />
            {/* Employees Routes */}
            <Route path={ROUTES.EMPLOYEES.BASE} element={<Employees />} />
            <Route path={ROUTES.EMPLOYEES.ADD} element={<CreateEmployees />} />
            <Route
              path={ROUTES.EMPLOYEES.UPDATE.PARAM}
              element={<EditEmployee />}
            />
            {/* developers Routes */}
            <Route
              path={ROUTES.TIME_TABLE.DEVELOPERS.BASE}
              element={
                <Developers
                  checkInNotifications={checkInNotifications}
                  checkOutNotifications={checkOutNotifications}
                />
              }
            />
            {/* internees Routes */}
            <Route
              path={ROUTES.TIME_TABLE.INTERNEES.BASE}
              element={
                <Internees
                  checkInNotifications={checkInNotifications}
                  checkOutNotifications={checkOutNotifications}
                />
              }
            />
          </Route>
          <Route
            path={ROUTES.AUTH.LOGIN}
            element={!isAuth ? <Login /> : <Navigate to={ROUTES.BASE} />}
          />
          <Route
            path={ROUTES.AUTH.FORGOT_PASSWORD}
            element={
              !isAuth ? <ForgotPassword /> : <Navigate to={ROUTES.BASE} />
            }
          />
          <Route
            path={ROUTES.AUTH.VERIFY_OTP.PARAM}
            element={!isAuth ? <VerifyOtp /> : <Navigate to={ROUTES.BASE} />}
          />
          <Route
            path={ROUTES.AUTH.RESET_PASSWORD.PARAM}
            element={
              !isAuth ? <ResetPassword /> : <Navigate to={ROUTES.BASE} />
            }
          />
          <Route path={ROUTES.ERROR} element={<ErrorPage404 />} />
        </Routes>
      </Suspense>
    );
  }
}
