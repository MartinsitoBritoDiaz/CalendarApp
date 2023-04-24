import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "./useAuthStore";

export const useAuthVerification = () => {
  const { errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Authentication error", errorMessage, "error");
    }
  }, [errorMessage]);

  return {};
};
