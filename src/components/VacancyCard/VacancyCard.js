import React from "react";
import "./VacancyCard.css";
import { NavLink } from "react-router-dom";

const VacancyCard = () => {
  return (
    <div className="vacancy-card">
      <div className="vacancy-data">
        <div>
            <NavLink to="/favorites" className="vacancy-title">Менеджер-дизайнер</NavLink>
        </div>
        
        <div className="vacancy-details">
          <p className="vacancy-salary">з/п от 7000 rub</p>
          <img src="img/Delimiter.svg"></img>
          <p className="vacancy-schedule">Полный рабочий день</p>
        </div>
        <div className="vacancy-location">
          <img src="img/Location.svg"></img>
          <p>Новый Уренгой</p>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;

