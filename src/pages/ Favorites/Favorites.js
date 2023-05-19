
import React, {useEffect, useState} from "react";
import "./Favorites.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import http from "../../http";
import VacancyCard from "../../components/VacancyCard/VacancyCard";

const Favorites = () => {

  let favoriteVacancies = localStorage.getItem('favorite');
  console.log(favoriteVacancies);
  const token = localStorage.getItem('token');
    favoriteVacancies = JSON.parse(favoriteVacancies);
    if (!favoriteVacancies) {
      favoriteVacancies = [];
    }

    const [vacancies, setVacancies] = useState([]);

  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

    const getVacancies = async () => {
        if(favoriteVacancies.length > 0){
            let vacanciesData = await http.get(`/vacancies/`,
                {
                    params: { ids: favoriteVacancies },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

            let outputVacancies = vacanciesData.data.objects.map((item) => {
                return {
                    profession: item.profession,
                    salary: item.payment_from,
                    schedule: item.type_of_work.title,
                    location: item.town.title,
                    id: item.id,
                };
            });

            setVacancies(outputVacancies);
        }
    }

    const removeVacancy = (id) => {
        const updateVacancies = vacancies.filter((vacancy) => vacancy.id !== id);
        setVacancies(updateVacancies);
    }

    useEffect(() => {
        getVacancies();
    }, []);

  return (
    <div className="favorites-page">
        {favoriteVacancies.length > 0 ? (
            <div className="vacancies">
                {vacancies.map((item) => {
                    const { id, ...itemProps } = item;
                    return <VacancyCard key={id} id={id} {...itemProps} removeCallback={removeVacancy} />;
                })}
            </div>
            )
            :
            (
                <>
                    <div className="man"></div>
                    <div className="text">Упс, здесь еще ничего нет!</div>
                    <Button onClick={routeChange} className="search-vacancies">
                        Поиск вакансий
                    </Button>
                </>
            )
        }

    </div>
  );
};

export default Favorites;
