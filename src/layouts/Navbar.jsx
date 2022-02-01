import CustomizedSwitches from '../components/darklight';
import { Link, useNavigate } from 'react-router-dom';
import { successful, error } from '../reducers/login';
import { useDispatch, useSelector } from "react-redux";

function NavBar() {

    const user = useSelector((state) => state.user);
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    function logout() {
        dispatch(error())
        navigate("../", { replace: true })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand fw-bold">
                        <img src="../movielogo.png" alt="" width="60" height="60" className="d-inline-block " />
                        <a className="navbar-brand fw-bold">Movie App</a>
                    </Link>
                    <Link to="/about" className="navbar-brand fw-bold">
                        <a className="navbar-brand fw-bold">About</a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {
                        login ?
                            <div className="collapse navbar-collapse fw-bold" id="navbarNav">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Movies
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to="/filter-movies/popular">Popular</Link></li>
                                            <li><Link className="dropdown-item" to="/filter-movies/top_rated">Top Rated</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                <CustomizedSwitches />
                                <div className="dropdown">
                                    <Link className="navbar-brand dropdown-toggle" to="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="../user.png" alt="" width="50" height="50" onClick="handleClick" className="d-inline-block  me-4" />
                                        {user.username}
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </nav>
        </>
    )
}

export default NavBar;

