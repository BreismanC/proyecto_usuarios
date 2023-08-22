import { PATHS } from "@routes/paths";
import { Link } from "react-router-dom";

const dataNavbar = [
  { id: 1, label: "Iniciar sesión", redirect: PATHS.SIGN_IN },
  { id: 2, label: "Registrarse", redirect: PATHS.SIGN_UP },
];

export const Navbar = () => {
  return (
    <ul>
      {dataNavbar.map((option) => (
        <li key={option.id}>
          <Link to={option.redirect}>{option.label}</Link>
        </li>
      ))}
    </ul>
  );
};
