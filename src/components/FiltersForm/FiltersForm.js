import React, { useState, useRef, useEffect, useContext } from "react";
import "./FiltersForm.scss";
import { Select, Button, NumberInput } from "@mantine/core";
import http from "../../http";
import { SearchContext } from "../../pages/Home/Home";

const FiltersForm = ({ getVacancies }) => {
  const context = useContext(SearchContext);

  const [categories, setCategories] = useState([]);
  const [selectOpened, setSelectOpened] = useState(false);
  const [searchValue, onSearchChange] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isActiveNumberInputFrom, setIsActiveNumberInputFrom] = useState(false);
  const [isActiveNumberInputTo, setIsActiveNumberInputTo] = useState(false);

  useEffect(() => {
    const isDisabledButtons =
      (context.selectedIndustryValue === null ||
        context.selectedIndustryValue === "") &&
      context.valueSalaryTo === "" &&
      context.valueSalaryFrom === "";
    setButtonDisabled(isDisabledButtons);
  }, [context]);

  useEffect(() => {
    getCatalogues();
  }, []);

  const getCatalogues = async () => {
    let categoriesData = await http.get("/catalogues/");

    let outputCategories = categoriesData.data.map((item) => {
      return {
        value: item.key,
        label: item.title,
      };
    });
    setCategories(outputCategories);
  };

  const handleSelectOpen = () => {
    setSelectOpened(true);
  };
  const handleSelectClose = () => {
    setSelectOpened(false);
  };

  const handleSelectChange = (value) => {
    context.setSelectedIndustryValue(value);
    setButtonDisabled(
      (value === "" || value === null) &&
        context.valueSalaryTo === "" &&
        context.valueSalaryFrom === ""
    );
  };
  const handleValueSalaryFromChange = (value) => {
    context.setValueSalaryFrom(value);
    setButtonDisabled(
      context.selectedIndustryValue === "" &&
        context.valueSalaryTo === "" &&
        value === ""
    );
  };
  const handleValueSalaryToChange = (value) => {
    context.setValueSalaryTo(value);
    setButtonDisabled(
      context.selectedIndustryValue === "" &&
        value === "" &&
        context.valueSalaryFrom === ""
    );
  };

  const handleNumberInputFromFocus = () => {
    setIsActiveNumberInputFrom(true);
  };
  const handleNumberInputFromBlur = () => {
    setIsActiveNumberInputFrom(false);
  };

  const handleNumberInputToFocus = () => {
    setIsActiveNumberInputTo(true);
  };

  const handleNumberInputToBlur = () => {
    setIsActiveNumberInputTo(false);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    getVacancies(
      context.inputValue,
      context.valueSalaryFrom,
      context.valueSalaryTo,
      context.selectedIndustryValue
    );
  };

  const onFormReset = () => {
    context.setSelectedIndustryValue("");
    context.setValueSalaryFrom("");
    context.setValueSalaryTo("");
    setButtonDisabled(true);
  };

  return (
    <form className="filters-form" onSubmit={onFormSubmit}>
      <div className="filters">
        <h2>Фильтры</h2>
        <Button
          className="reset"
          rightIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="11.7425"
                y1="4.44219"
                x2="4.44197"
                y2="11.7427"
                stroke="#ACADB9"
                strokeWidth="1.25"
              />
              <line
                x1="11.9013"
                y1="11.7425"
                x2="4.60082"
                y2="4.44197"
                stroke="#ACADB9"
                strokeWidth="1.25"
              />
            </svg>
          }
          variant="white"
          disabled={buttonDisabled}
          onClick={onFormReset}
        >
          Сбросить все
        </Button>
      </div>
      <div className="industry">
        <h3>Отрасль</h3>
        <Select
          data-elem="industry-select"
          className="industry-select"
          value={context.selectedIndustryValue}
          onChange={handleSelectChange}
          searchable
          clearable
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          nothingFound="Не найдено"
          dropdownPosition="bottom"
          rightSection={
            <img
              src={selectOpened ? "/img/Arrow_up.svg" : "/img/Arrow_down.svg"}
              alt=""
              onClick={() => {
                setSelectOpened(!selectOpened);
              }}
            />
          }
          placeholder="Выберете отрасль"
          data={categories}
          onDropdownOpen={handleSelectOpen}
          onDropdownClose={handleSelectClose}
          styles={() => ({
            item: {
              "&[data-selected]": {
                "&, &:hover": {
                  backgroundColor: "#5E96FC",
                  color: "#FFFFFF",
                },
              },
              "&[data-hovered]": {
                backgroundColor: "#DEECFF",
                color: "#232134",
              },
            },
          })}
        />
      </div>
      <div className="salary">
        <h3>Оклад</h3>
        <NumberInput
          data-elem="salary-from-input"
          min={0}
          type="number"
          className={
            isActiveNumberInputFrom ? "salary-input-active" : "salary-input"
          }
          value={context.valueSalaryFrom}
          onChange={handleValueSalaryFromChange}
          onFocus={handleNumberInputFromFocus}
          onBlur={handleNumberInputFromBlur}
          placeholder="От"
        />

        <NumberInput
          data-elem="salary-to-input"
          min={context.valueSalaryFrom || 0}
          type="number"
          className={
            isActiveNumberInputTo ? "salary-input-active" : "salary-input"
          }
          value={context.valueSalaryTo}
          onChange={handleValueSalaryToChange}
          onFocus={handleNumberInputToFocus}
          onBlur={handleNumberInputToBlur}
          placeholder="До"
        />
      </div>

      <Button data-elem="search-button" className="apply" type="submit">
        Применить
      </Button>
    </form>
  );
};

export default FiltersForm;
