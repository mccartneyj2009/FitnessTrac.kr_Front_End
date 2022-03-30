import { Link } from "react-router-dom";
import "./css/NavBar.css";

const NavBar = ({ token, user, setToken }) => {
    if (token) {
        return (
            <>
                <Link to="/">Home</Link>
                <Link to="/routines">Routines</Link>
                <Link to="/activities">Activities</Link>
                <Link
                    to="/"
                    replace
                    onClick={() => {
                        localStorage.removeItem("token");
                        setToken("");
                    }}
                >
                    Logout
                </Link>
            </>
        );
    } else {
        return (
            <>
                <Link to="/">Home</Link>
                <Link to="/routines">Routines</Link>
                <Link to="/activities">Activities</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </>
        );
    }
};
export default NavBar;
