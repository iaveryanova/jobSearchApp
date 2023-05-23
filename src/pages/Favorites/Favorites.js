import React, { useEffect, useState } from "react";
import "./Favorites.scss";
import { Button, Loader, Pagination } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import http from "../../http";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import NotFound from "../../components/NotFound/NotFound";

const Favorites = () => {
  let favoriteVacancies = localStorage.getItem("favorite");
  const token = localStorage.getItem("token");
  favoriteVacancies = JSON.parse(favoriteVacancies);
  if (!favoriteVacancies) {
    favoriteVacancies = [];
  }

  const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVacancies, setTotalVacancies] = useState(null);
  const itemsPerPage = 4;

  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  const changePage = (value) => {
    getFavoriteVacancies(value);
  };

  const getFavoriteVacancies = async (page = 1) => {
    if (favoriteVacancies.length > 0) {
      let vacanciesData = await http.get(
        `/vacancies/?page=${page - 1}&count=${itemsPerPage}`,
        {
          params: { ids: favoriteVacancies },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentPage(page);
      setTotalVacancies(
        vacanciesData.data.total > 500 ? 500 : vacanciesData.data.total
      );

      let outputVacancies = vacanciesData.data.objects.map((item) => {
        return {
          profession: item.profession,
          salaryFrom: item.payment_from,
          salaryTo: item.payment_to,
          schedule: item.type_of_work.title,
          location: item.town.title,
          id: item.id,
        };
      });

      setVacancies(outputVacancies);
    }
  };

  const removeVacancy = (id) => {
    const updateVacancies = vacancies.filter((vacancy) => vacancy.id !== id);
    setVacancies(updateVacancies);
  };

  useEffect(() => {
    getFavoriteVacancies();
  }, []);

  return (
    <div className="favorites-page">
      {favoriteVacancies.length > 0 ? (
        totalVacancies > 0 ? (
          <div className="favorite-vacancies">
            {vacancies.map((item) => {
              const { id, ...itemProps } = item;
              return (
                <VacancyCard
                  key={id}
                  id={id}
                  {...itemProps}
                  removeCallback={removeVacancy}
                />
              );
            })}
          </div>
        ) : totalVacancies == 0 ? (
          <>
            <NotFound />
            <Button onClick={routeChange} className="search-vacancies">
              Поиск вакансий
            </Button>
          </>
        ) : (
          <div className="loading">
            <Loader />
          </div>
        )
      ) : (
        <>
          <NotFound />
          <Button onClick={routeChange} className="search-vacancies">
            Поиск вакансий
          </Button>
        </>
      )}

      {totalVacancies > 4 && (
        <Pagination
          value={currentPage}
          position="center"
          className="pagination"
          total={Math.ceil(totalVacancies / itemsPerPage)}
          onChange={changePage}
        />
      )}
    </div>
  );
};

export default Favorites;
