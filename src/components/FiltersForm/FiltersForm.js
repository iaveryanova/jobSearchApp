import React, { useState, useRef, useEffect, useContext } from "react";
import "./FiltersForm.css";
import { Select } from "@mantine/core";
import { Button } from "@mantine/core";
import { NumberInput } from "@mantine/core";
import http from "../../http";
import { SearchContext } from '../../pages/Home/Home';

const FiltersForm = ({getVacancies}) => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    getCatalogues();
  }, []);

  const [selectOpened, setSelectOpened] = useState(false);
  const handleSelectOpen = () => {
    setSelectOpened(true);
  };
  const handleSelectClose = () => {
    setSelectOpened(false);
  };

  const context = useContext(SearchContext);

  const [searchValue, onSearchChange] = useState("");
  const handlersFrom = useRef();
  const handlersTo = useRef();

  const [buttonResetDisabled, setButtonResetDisabled] = useState(true);
  const [buttonApplyDisabled, setButtonApplyDisabled] = useState(true);
  const handleSelectChange = (value) => {
    context.setSelectedIndustryValue(value);
    setButtonApplyDisabled(value === "" || value === null);
    setButtonResetDisabled(
      (value === "" || value === null) &&
        context.valueSalaryTo === "" &&
        context.valueSalaryFrom === ""
    );
  };
  const handleValueSalaryFromChange = (value) => {
    context.setValueSalaryFrom(value);
    setButtonResetDisabled(
      context.selectedIndustryValue === "" && context.valueSalaryTo === "" && value === ""
    );
  };
  const handleValueSalaryToChange = (value) => {
    context.setValueSalaryTo(value);
    setButtonResetDisabled(
      context.selectedIndustryValue === "" && value === "" && context.valueSalaryFrom === ""
    );
  };

  const [isActiveNumberInputFrom, setIsActiveNumberInputFrom] = useState(false);
  const [isActiveNumberInputTo, setIsActiveNumberInputTo] = useState(false);
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

  const reset = () => {
    context.setSelectedIndustryValue("");
    context.setValueSalaryFrom("");
    context.setValueSalaryTo("");
    setButtonResetDisabled(true);
    setButtonApplyDisabled(true);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    getVacancies(context.inputValue, context.valueSalaryFrom, context.valueSalaryTo, context.selectedIndustryValue);
    console.log(context.inputValue, context.selectedIndustryValue, context.valueSalaryFrom, context.valueSalaryTo);
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
          disabled={buttonResetDisabled}
          onClick={reset}
        >
          Сбросить все
        </Button>
      </div>
      <div className="industry">
        <h3>Отрасль</h3>
        <Select
          className="industry-select"
          value={context.selectedIndustryValue}
          onChange={handleSelectChange}
          searchable
          clearable
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          nothingFound="Не найдено"
          rightSection={
            <img
              src={selectOpened ? "/img/Arrow_up.svg" : "/img/Arrow_down.svg"}
              onClick={() => {
                setSelectOpened(!selectOpened);
              }}
            />
          }
          placeholder="Выберете отрасль"
          data={categories}
          onDropdownOpen={handleSelectOpen}
          onDropdownClose={handleSelectClose}
        />
      </div>
      <div className="salary">
        <h3>Оклад</h3>
        <NumberInput
          min={0}
          type="number"
          className={
            isActiveNumberInputFrom ? "salary-input-active" : "salary-input"
          }
          value={context.valueSalaryFrom}
          onChange={handleValueSalaryFromChange}
          handlersRef={handlersFrom}
          onFocus={handleNumberInputFromFocus}
          onBlur={handleNumberInputFromBlur}
          rightSection={
            <>
              <svg
                className="arrow-up"
                onClick={() => handlersFrom.current.increment()}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5"
                  stroke="#ACADB9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="arrow-down"
                onClick={() => handlersFrom.current.decrement()}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5"
                  stroke="#ACADB9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </>
          }
          placeholder="От"
        />

        <NumberInput
          min={context.valueSalaryFrom}
          type="number"
          className={
            isActiveNumberInputTo ? "salary-input-active" : "salary-input"
          }
          value={context.valueSalaryTo}
          onChange={handleValueSalaryToChange}
          handlersRef={handlersTo}
          onFocus={handleNumberInputToFocus}
          onBlur={handleNumberInputToBlur}
          rightSection={
            <>
              <svg
                className="arrow-up"
                onClick={() => handlersTo.current.increment()}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5"
                  stroke="#ACADB9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="arrow-down"
                onClick={() => handlersTo.current.decrement()}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5"
                  stroke="#ACADB9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </>
          }
          placeholder="До"
        />
      </div>

      <Button className="apply" disabled={buttonApplyDisabled} type="submit">
        Применить
      </Button>
    </form>
  );
};

export default FiltersForm;
