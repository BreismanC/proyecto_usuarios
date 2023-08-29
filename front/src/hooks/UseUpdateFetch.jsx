import { useState } from "react";
import { updateAPI } from "@services/api/userEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { modifyUser } from "../redux/states/user";

export const UseUpdateFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = useSelector((store) => store.token);
  const dispatcher = useDispatch();

  const userUpdate = async (id, dataToFetch) => {
    setIsLoading(true);
    setError(null);

    console.log(token);

    try {
      const { data } = await updateAPI(`users/${id}`, dataToFetch, token);

      const { details } = data;
      console.log(details);
      dispatcher(modifyUser(details));
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    userUpdate,
  };
};
