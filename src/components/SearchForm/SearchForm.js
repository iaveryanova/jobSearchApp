import React, { useContext } from "react";
import "./SearchForm.scss";
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
  };
  return (
    <div className="search">
      <img src="/img/Search.svg" alt=""></img>
      <input
        data-elem="search-input"
        type="text"
        className="input-search"
        placeholder="Введите название вакансии"
        value={context.inputValue || ''}
        onChange={handleInputChange}
      />

      <Button
        data-elem="search-button"
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
