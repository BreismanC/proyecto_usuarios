import { useSelector } from "react-redux";
import { Image } from "@atoms/Image/Image";
import { Description } from "@atoms/Description/Description";
import { UpdateImageForm } from "../UpdateImageForm/UpdateImageForm";
import "./UserCard.css";

export const UserCard = () => {
  const { id, name, lastname, email, image } = useSelector(
    (store) => store.user
  );

  return (
    <div id={id} className="userCard">
      <div className="containerImage">
        <Image src={image} title={`image-${name}`} />
      </div>
      <div className="containerDescription">
        <Description title={"Nombre"} content={name} />
        <Description title={"Apellido"} content={lastname} />
        <Description title={"Correo"} content={email} />
        <UpdateImageForm />
      </div>
    </div>
  );
};
