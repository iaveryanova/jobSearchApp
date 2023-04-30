import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
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
