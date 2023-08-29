import { PUBLIC_ROUTES } from "@routes/paths";
import { Link } from "react-router-dom";
import "./Navbar.css";

const dataNavbar = [
  { id: 1, label: "Iniciar sesión", redirect: PUBLIC_ROUTES.SIGN_IN },
  { id: 2, label: "Registrarse", redirect: PUBLIC_ROUTES.SIGN_UP },
];

export const Navbar = () => {
  return (
    <ul className="navbar">
      {dataNavbar.map((option) => (
        <li key={option.id}>
          <Link to={option.redirect}>{option.label}</Link>
        </li>
      ))}
    </ul>
  );
};
