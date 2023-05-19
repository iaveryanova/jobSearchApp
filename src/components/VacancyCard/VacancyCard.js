import React, {useState} from "react";
import "./VacancyCard.css";
import { NavLink } from "react-router-dom";
import { Button } from '@mantine/core';
import { useParams } from "react-router-dom";



const VacancyCard = ({id, profession, salary, schedule, location}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="vacancy-card">
      <div className="vacancy-data">
        <div className="title">
            <NavLink to={"/vacancy/" + id} className="vacancy-title">{profession}</NavLink>
            <Button 
            classNames="star"
            onClick={() => setIsClicked(!isClicked)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            leftIcon={
                <img
                  src={
                    isClicked
                      ? '/img/Star_fill.svg'
                      : isHovered
                      ? '/img/Star_blue.svg'
                      : '/img/Star.svg'
                  }
                  className="star"
                />
              }
            variant="white"
            styles={(theme) => ({
                inner: {
                    width: '22px',
                    height: '20px'
                },
                root: {
                    padding: '0px',
                    border: '0px',
                    height: '20px'
                },
                leftIcon: {
                    marginRight: '0px'
                }
            })}
            className="favorites"
            >
            </Button>
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

