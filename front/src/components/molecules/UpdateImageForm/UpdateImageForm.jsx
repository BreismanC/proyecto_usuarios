import { useForm } from "react-hook-form";
import { InputUpdateImage } from "../InputUpdateImage/InputUpdateImage";
import { Button } from "@atoms/Button/Button";

export const UpdateImageForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (imageToFetch) => {
    console.log({ imageToFetch });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputUpdateImage register={register} errors={errors} />
      <Button title="Actualizar" />
    </form>
  );
};
