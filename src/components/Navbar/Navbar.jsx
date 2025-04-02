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
        <div className="navbar__item" data-tooltip="Employees List">
          <Link to='/' aria-label="go to employee list">
            <img
              src={faListDots}
              className={`navbar__item__cta ${location.pathname === "/" && "active"}`}
            />
          </Link>
        </div>
        <div className="navbar__item" data-tooltip="Create Employee">
          <Link to='/add' aria-label="go to create employee page" >
            <img
              src={faAdd}
              className={`navbar__item__cta ${location.pathname === "/add" && "active"}`}
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}