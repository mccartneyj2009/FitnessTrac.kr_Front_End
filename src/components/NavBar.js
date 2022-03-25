import { Link } from "react-router-dom";

import "./css/NavBar.css"

//will need tokens and user
//add my routines & logout option after getting user
const NavBar = () => {
  return (

    <div className="navbar_main">

    <h1>FitnessTrac.kr</h1>

    <div className="navbar_links_container">

      <Link to="/">HOME</Link>
      <Link to="/routines">ROUTINES</Link>
      <Link to="/activities">ACTIVITIES</Link>
      <Link to="/register">LOGIN</Link>

    </div>

    </div>

  );
};
export default NavBar;
