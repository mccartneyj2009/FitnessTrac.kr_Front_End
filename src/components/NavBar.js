import { Link } from "react-router-dom";

//will need tokens and user
//add my routines & logout option after getting user
const NavBar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/Routines">Routines</Link>
      <Link to="/Activities">Activities</Link>
      <Link to="/Register">Register/Login</Link>
    </>
  );
};
export default NavBar;
