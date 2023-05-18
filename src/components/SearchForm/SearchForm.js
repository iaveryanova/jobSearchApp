import React, { useState, useContext } from "react";
import "./SearchForm.css";
import { Button } from "@mantine/core";
import { SearchContext } from "../../pages/Home/Home";

const SearchForm = ({ getVacancies }) => {
  const context = useContext(SearchContext);

  const handleInputChange = (e) => {
    context.setInputValue(e.target.value);
  };

  const searchVacancies = () => {
    getVacancies(
      context.inputValue,
      context.valueSalaryFrom,
      context.valueSalaryTo,
      context.selectedIndustryValue
    );
    console.log(
      context.inputValue,
      context.selectedIndustryValue,
      context.valueSalaryFrom,
      context.valueSalaryTo
    );
  };
  return (
    <div className="search">
      <img src="/img/Search.svg" alt=""></img>
      <input
        type="text"
        className="input-search"
        placeholder="Введите название вакансии"
        value={context.inputValue}
        onChange={handleInputChange}
      />

      <Button
        className="btn-search"
        onClick={searchVacancies}
        disabled={!context.inputValue}
      >
        Поиск
      </Button>
    </div>
  );
};

export default SearchForm;
