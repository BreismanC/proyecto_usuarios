import { useState } from "react";
import { patchAPI } from "../services/api/userEndpoints";

export const UsePatchFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userPatch = async (dataToFetch, token) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await patchAPI(
        `users/email-validate`,
        dataToFetch,
        token
      );

      return response;
    } catch (e) {
      console.log(e);
      setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    userPatch,
  };
};
