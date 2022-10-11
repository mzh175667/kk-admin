import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../common/routes";
import { Toast } from "../helpers/sweetAlert";

// export const fetchDataWithBodyAndToast = async (url, body) => {
//   try {
//     const response = await axios.post(url, body);
//     console.log(response.data);
//     if (response.data.success === true) {
//       Toast.fire({
//         icon: "success",
//         title: response.data.message,
//       });
//     } else {
//       Toast.fire({
//         icon: "error",
//         title: response.data.message,
//       });
//     }
//     return response;
//   } catch (error) {
//     return error;
//   }
// };
export const fetchDataWithBodyAndToast = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    if (response?.success === true) {
      Toast.fire({
        icon: "success",
        title: response?.message,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: response?.message,
      });
    }
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchDataWithBody = async (url, body) => {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deleteDataFromBody = async (url, data) => {
  try {
    const response = await axios.delete(url, { data });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const fetchDataWithoutBody = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
