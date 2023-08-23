import { Navbar } from "@atoms/Navbar/Navbar";

export const Header = ({ token }) => {
  return <header>{!token ? <Navbar /> : <h1>UserDetails</h1>}</header>;
};
