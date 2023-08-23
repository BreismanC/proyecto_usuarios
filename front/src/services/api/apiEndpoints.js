import axios from "axios";

const URL_BASE = "http://localhost:3000";
// const URL_BASE = "api";

export async function postAPI(endPoint, data) {

  try {
    const response = await axios.post(`${URL_BASE}/${endPoint}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*",
        // Authorization: `Bearer ${token}`,
      },
      // files: { image: data.get("image") },
    });

    // const response = await fetch(`${URL_BASE}/${endPoint}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Accept: "*",
    //     // Authorization: `Bearer ${token}`,
    //   },
    //   body: data,
    //   // files: { image: data.get("image") },
    // });

    console.log({ response });
    return response;
  } catch (e) {
    console.error(e);
  }
}
