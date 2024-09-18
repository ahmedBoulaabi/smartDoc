import Swal from "sweetalert2";

export const showConfirmationAlert = (
  message: string,
  callback: () => void
) => {
  Swal.fire({
    title: "Êtes-vous sûr?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui",
    cancelButtonText: "Annuler",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

export const showSuccessAlert = (message: string) => {
  Swal.fire({
    icon: "success",
    title: "Succès!",
    text: message,
  });
};

export const showErrorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Oups...",
    text: message,
  });
};
