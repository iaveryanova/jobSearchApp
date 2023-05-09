import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="img/Union.svg" alt="" className="logo-image"></img>
        <div className="logo-name">
          <p>Jobored</p>
        </div>
      </div>
      <ul>
        <li>
          <NavLink to="/">Поиск вакансий</NavLink>
        </li>

        <li>
          <NavLink to="/favorites">Избранное</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
