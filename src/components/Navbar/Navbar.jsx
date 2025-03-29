import { Link, useLocation } from "react-router";
import faAdd from '../../assets/icons/faadd.svg';
import faListDots from '../../assets/icons/falistdot.svg';
import "./Navbar.scss";

export const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <h1 className="navbar__title">HRNet</h1>
      <div className="navbar__items">
        <div className="navbar__item" data-tooltip="Create Employee">
          <Link to='/employee-list' aria-label="go to employee list">
            <img
              src={faListDots}
              className={`navbar__item__cta ${location.pathname === "/employee-list" && "active"}`}
            />
          </Link>
        </div>
        <div className="navbar__item" data-tooltip="Employees List">
          <Link to='/create-employee' aria-label="go to create employee" >
            <img
              src={faAdd}
              className={`navbar__item__cta ${location.pathname === "/create-employee" && "active"}`}
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}