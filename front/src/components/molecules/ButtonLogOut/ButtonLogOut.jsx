import { Button } from "@atoms/Button/Button";
import { useDispatch } from "react-redux";
import { resetToken } from "@redux/states/token";
import { resetUser } from "@redux/states/user";

export const ButtonLogOut = () => {
  const dispatcher = useDispatch();
  const handleClick = () => {
    dispatcher(resetToken());
    dispatcher(resetUser());
  };
  return <Button title="Cerrar sesión" handleClick={handleClick} />;
};
