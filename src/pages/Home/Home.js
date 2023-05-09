import React from "react";
import "./Home.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import VacancyCard from "../../components/VacancyCard/VacancyCard";

const Home = () => {
  return (
    <div className="search-page">
      <FiltersForm />
      <div className="vacancies">
        <SearchForm />
        <VacancyCard />
        <VacancyCard />
        <VacancyCard />
        <VacancyCard />
      </div>
    </div>
  );
};

export default Home;
