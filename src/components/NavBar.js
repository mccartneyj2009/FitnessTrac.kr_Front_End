import { Link } from "react-router-dom";

//will need tokens and user
//add my routines & logout option after getting user
const NavBar = () => {
    const lsToken = localStorage.getItem("token");

    if (lsToken) {
        return (
            <>
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
            </>
        );
    }

    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/routines">Routines</Link>
            <Link to="/activities">Activities</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </>
    );
};
export default NavBar;
