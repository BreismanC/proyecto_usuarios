export const objectToArrayOfValues = (obj) => {
  return Object.values(obj);
};

export const objectToArrayOfKeyAndValues = (obj) => {
  return Object.entries(obj);
};

export const formatDataToFetch = (data) => {
  const formData = new FormData();
  const arrayData = objectToArrayOfKeyAndValues(data);

  const arrayDataFinalToSend = arrayData.filter((element) => {
    return (
      !element[0].includes("image") ||
      (element[0].includes("image") &&
        objectToArrayOfValues(element[1]).length !== 0)
    );
  });

  arrayDataFinalToSend.forEach((element) => {
    if (element[0].includes("image")) {
      formData.append(`${element[0]}`, element[1][0]);
    } else {
      formData.append(`${element[0]}`, element[1]);
    }
  });
  return formData;
};
