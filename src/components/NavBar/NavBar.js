import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="container">
      <nav>
        <div className="logo">
          <NavLink to="/">
            <img src="/img/Union.svg" alt="" className="logo-image" />
          </NavLink>
          <NavLink to="/">
            <div className="logo-name">
              <p>Jobored</p>
            </div>
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Поиск вакансий
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Избранное
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
