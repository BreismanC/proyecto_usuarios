import { PUBLIC_ROUTES } from "@routes/paths";
import { NavLink } from "react-router-dom";
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
          <NavLink
            to={option.redirect}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {option.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
