import { faAdd, faListDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "react-router";
import "./Navbar.scss";

export const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <h1 className="navbar__title">HRNet</h1>
      <div className="navbar__items">
        <div className="navbar__item">
          <Link to='/employee-list' >
            <FontAwesomeIcon
              icon={faListDots}
              className={`navbar__item__cta ${location.pathname === "/employee-list" && "active"}`}
            />
          </Link>
          <p className="navbar__item__text">Create Employee</p>
        </div>
        <div className="navbar__item">
          <Link to='/create-employee' >
            <FontAwesomeIcon
              icon={faAdd}
              className={`navbar__item__cta ${location.pathname === "/create-employee" && "active"}`}
            />
          </Link>
          <p className="navbar__item__text">Employees List</p>
        </div>
      </div>
    </nav>
  )
}