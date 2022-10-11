import Swal from "sweetalert2";

const ConfirmSweetAlert = (confirmBtnText, employee) => {
  return Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4caf50",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmBtnText,
    width: "25em",
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export { ConfirmSweetAlert, Toast };
