import axios from "axios";

const URL_BASE = "http://localhost:3000";
// `${URL_BASE}/${endPoint}`
//http://localhost:3000/users

export async function postAPI(endPoint, data) {
  try {
    const response = await axios.post(`${URL_BASE}/${endPoint}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*",
        // Authorization: `Bearer ${token}`,
      },
    });

    console.log({ response });
    return response;
  } catch (e) {
    console.error(e);
  }
}
