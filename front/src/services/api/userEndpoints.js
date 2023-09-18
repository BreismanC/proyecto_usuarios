import { axiosInstance } from "./axiosInstance";

export async function postAPI(endPoint, data) {
  try {
    const response = await axiosInstance.post(`/${endPoint}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
    });

    console.log({ response });
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function getUserByEmailAndPassword(endPoint, data) {
  try {
    const response = await axiosInstance.post(`/${endPoint}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
}

export async function updateAPI(endPoint, data, token) {
  try {
    const response = await axiosInstance.put(`/${endPoint}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });

    console.log({ response });
    return response;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
}

export async function patchAPI(endPoint, data, token) {
  try {
    const response = await axiosInstance.patch(
      `${endPoint}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log({ response });
    return response;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
}
