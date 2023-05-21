import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav>
      <div className="logo">
        <NavLink to="/">
          <img src="/img/Union.svg" alt="" className="logo-image"></img>
        </NavLink>
        <div className="logo-name">
          <p>Jobored</p>
        </div>
      </div>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive? "active": ''}>
            Поиск вакансий
          </NavLink>
        </li>

        <li>
          <NavLink to="/favorites" className={({ isActive }) => isActive? "active": ''}>
            Избранное
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
