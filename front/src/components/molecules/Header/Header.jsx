import { Navbar } from "@atoms/Navbar/Navbar";
import { ButtonLogOut } from "@molecules/ButtonLogOut/ButtonLogOut";
import "./Header.css";

export const Header = ({ token }) => {
  return (
    <header className="header">{!token ? <Navbar /> : <ButtonLogOut />}</header>
  );
};
