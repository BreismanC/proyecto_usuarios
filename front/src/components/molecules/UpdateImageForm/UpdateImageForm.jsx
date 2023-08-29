import { useForm } from "react-hook-form";
import { InputUpdateImage } from "../InputUpdateImage/InputUpdateImage";
import { Button } from "@atoms/Button/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatDataToFetch } from "@utilities/helpers";
import { UseUpdateFetch } from "@hooks/UseUpdateFetch";
import { Form } from "@atoms/Form/Form";

export const UpdateImageForm = () => {
  const [notFoundImage, setNotFoundImage] = useState();

  const user = useSelector((store) => store.user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isLoading, error, userUpdate } = UseUpdateFetch();

  const onSubmit = async (imageToFetch) => {
    setNotFoundImage();
    if (imageToFetch.image.length === 0) {
      return setNotFoundImage("No has seleccionado una imagen");
    }
    const data = { ...user, image: imageToFetch.image };
    console.log(data);
    const bodyRequest = formatDataToFetch(data);
    userUpdate(data.id, bodyRequest);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputUpdateImage register={register} errors={errors} />
      {isLoading ? (
        <span className="loading">Cargando...</span>
      ) : (
        <Button title="Actualizar" />
      )}
      {notFoundImage && <span>{notFoundImage}</span>}
      {error && <span className="error">{error}</span>}
    </Form>
  );
};
