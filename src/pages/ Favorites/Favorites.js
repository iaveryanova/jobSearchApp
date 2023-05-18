import React from "react";
import "./Favorites.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  return (
    <div className="favorites-page">
      <div className="man"></div>
      <div className="text">Упс, здесь еще ничего нет!</div>
      <Button onClick={routeChange} className="search-vacancies">
        Поиск вакансий
      </Button>
    </div>
  );
};

export default Favorites;
