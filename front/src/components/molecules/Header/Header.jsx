import { Navbar } from "@atoms/Navbar/Navbar";
import { ButtonLogOut } from "@molecules/ButtonLogOut/ButtonLogOut";

export const Header = ({ token }) => {
  return <header>{!token ? <Navbar /> : <ButtonLogOut />}</header>;
};
