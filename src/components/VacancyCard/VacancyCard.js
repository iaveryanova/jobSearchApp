import React, { useState } from "react";
import "./VacancyCard.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mantine/core";
import { useParams } from "react-router-dom";

const VacancyCard = ({
  id,
  profession,
  salary,
  schedule,
  location,
  removeCallback = (id) => {},
}) => {
  let favoriteVacancies = localStorage.getItem("favorite");

  let favArray = JSON.parse(favoriteVacancies);
  let initFav = false;
  if (favArray) {
    initFav = favArray.includes(id);
  }

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(initFav);

  const toggleFavorite = () => {
    if (isClicked) {
      if (favoriteVacancies) {
        let newArrFav = JSON.parse(favoriteVacancies);
        newArrFav.pop(id);
        let stringJsonFav = JSON.stringify(newArrFav);
        localStorage.setItem("favorite", stringJsonFav);
        removeCallback(id);
      }
    } else {
      let newArrFav = favoriteVacancies ? JSON.parse(favoriteVacancies) : [];
      newArrFav.push(id);
      let stringJsonFav = JSON.stringify(newArrFav);
      localStorage.setItem("favorite", stringJsonFav);
    }
    setIsClicked(!isClicked);
  };

  return (
    <div className="vacancy-card">
      <div className="vacancy-data">
        <div className="title">
          <NavLink to={"/vacancy/" + id} className="vacancy-title">
            {profession}
          </NavLink>
          <Button
            classNames="star"
            onClick={toggleFavorite}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            leftIcon={
              <img
                src={
                  isClicked
                    ? "/img/Star_fill.svg"
                    : isHovered
                    ? "/img/Star_blue.svg"
                    : "/img/Star.svg"
                }
                className="star"
              />
            }
            variant="white"
            styles={(theme) => ({
              inner: {
                width: "22px",
                height: "20px",
              },
              root: {
                padding: "0px",
                border: "0px",
                height: "20px",
              },
              leftIcon: {
                marginRight: "0px",
              },
            })}
            className="favorites"
          ></Button>
        </div>

        <div className="vacancy-details">
          <p className="vacancy-salary">з/п от {salary} rub</p>
          <img src="/img/Delimiter.svg"></img>
          <p className="vacancy-schedule">{schedule}</p>
        </div>
        <div className="vacancy-location">
          <img src="/img/Location.svg"></img>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;
