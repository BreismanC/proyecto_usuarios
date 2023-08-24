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
