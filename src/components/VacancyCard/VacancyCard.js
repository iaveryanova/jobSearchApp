import React, { useState } from "react";
import "./VacancyCard.scss";
import { NavLink } from "react-router-dom";
import { Button } from "@mantine/core";

const VacancyCard = ({
  id,
  profession,
  salaryFrom,
  salaryTo,
  agreement,
  schedule,
  location,
  removeCallback = function (id) {},
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
    <div data-elem={"vacancy-" + id} className="vacancy-card">
      <div className="vacancy-data">
        <div className="title">
          <NavLink to={"/vacancy/" + id} className="vacancy-title">
            {profession}
          </NavLink>
          <Button
            data-elem={"vacancy-" + id + "-shortlist-button"}
            className="star"
            onClick={toggleFavorite}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            leftIcon={
              <img
                alt=""
                src={
                  isClicked
                    ? "/img/Star_fill.svg"
                    : isHovered
                    ? "/img/Star_blue.svg"
                    : "/img/Star.svg"
                }
              />
            }
            variant="white"
          ></Button>
        </div>

        <div className="vacancy-details">
          <p className="vacancy-salary">
            з/п
            {agreement ? (
              <> по договоренности</>
            ) : (
              <>
                {salaryTo === 0 && salaryFrom === 0 ? (
                  <> не указана</>
                ) : salaryTo !== 0 && salaryFrom !== 0 ? (
                  <>
                    {" "}
                    {salaryFrom} - {salaryTo}{" "}
                  </>
                ) : salaryTo === 0 ? (
                  <> от {salaryFrom} </>
                ) : (
                  <> {salaryTo} </>
                )}
                rub
              </>
            )}
          </p>
          <img alt="" src="/img/Delimiter.svg" />
          <p className="vacancy-schedule">{schedule}</p>
        </div>
        <div className="vacancy-location">
          <img alt="" src="/img/Location.svg" />
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;
