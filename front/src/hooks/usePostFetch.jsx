import { useState } from "react";
import { postAPIJSON } from "../services/api/userEndpoints";

export const UsePostFetch = () => {
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [errorPost, setErrorPost] = useState(null);

  const userPost = async (dataToFetch) => {
    setIsLoadingPost(true);
    setErrorPost(null);

    try {
      const response = await postAPIJSON(
        `/users/resend-message-email-validate`,
        dataToFetch
      );

      return response;
    } catch (e) {
      console.log(e);
      setErrorPost(e.message);
      throw e;
    } finally {
      setIsLoadingPost(false);
    }
  };

  return {
    isLoadingPost,
    errorPost,
    userPost,
  };
};
