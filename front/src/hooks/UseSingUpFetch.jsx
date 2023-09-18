import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { PUBLIC_ROUTES } from "@routes/paths";
import { postAPI } from "@services/api/userEndpoints";
import Swal from "sweetalert2";

export const UseSignUpFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  const userRegister = async (dataToFetch) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await postAPI("users/", dataToFetch);

      const { details } = data;
      console.log(details);
      Swal.fire("Usuario creado.", "Debes validar el email", "success");
    } catch (e) {
      setError(e.message);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    userRegister,
  };
};
