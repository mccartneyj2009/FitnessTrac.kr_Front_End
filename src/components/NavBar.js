import { Link } from "react-router-dom";

import "./css/NavBar.css";

//will need tokens and user
//add my routines & logout option after getting user
const NavBar = () => {
    const lsToken = localStorage.getItem("token");

    if (lsToken) {
        return (
            <div className="navbar_main">
              
                <h1>FitnessTrac.kr</h1>

                <Link to="/">Home</Link>
                <Link to="/routines">Routines</Link>
                <Link to="/activities">Activities</Link>
                <Link
                    to="/"
                    onClick={() => {
                        localStorage.removeItem("token");
                    }}
                >
                    Logout
                </Link>
            </div>
        );
    }

    return (
        <div className="navbar_main">

            <h1>FitnessTrac.kr</h1>

            <div className="navbar_links_container">
              <Link to="/">Home</Link>
              <Link to="/routines">Routines</Link>
              <Link to="/activities">Activities</Link>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>

        </div>
    );
};
export default NavBar;
