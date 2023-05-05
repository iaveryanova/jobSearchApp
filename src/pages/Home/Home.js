import React from "react";
import "./Home.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import FiltersForm from "../../components/FiltersForm/FiltersForm";

const Home = () => {
  return (
    <div className="search-page">
      <FiltersForm />
      <SearchForm />
    </div>
  );
};

export default Home;
