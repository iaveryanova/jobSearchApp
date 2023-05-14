import React, { useState, useRef } from "react";
import "./FiltersForm.css";
import { Select } from "@mantine/core";
import { Button } from "@mantine/core";
import { NumberInput } from "@mantine/core";

const FiltersForm = () => {
  const [selectOpened, setSelectOpened] = useState(false);
  const [searchValue, onSearchChange] = useState("");
  const [selectedIndustryValue, setSelectedIndustryValue] = useState("");
  const [valueSalaryFrom, setValueSalaryFrom] = useState("");
  const [valueSalaryTo, setValueSalaryTo] = useState("");
  const handlersFrom = useRef();
  const handlersTo = useRef();

  const [buttonResetDisabled, setButtonResetDisabled] = useState(true);
  const [buttonApplyDisabled, setButtonApplyDisabled] = useState(true);

  const handleSelectOpen = () => {
    setSelectOpened(true);
  };

  const handleSelectClose = () => {
    setSelectOpened(false);
  };

  const handleSelectChange = (value) => {
    setSelectedIndustryValue(value);
    setButtonApplyDisabled(value === "" || value === null);
    setButtonResetDisabled(
      (value === "" || value === null) && valueSalaryTo === "" && valueSalaryFrom === ""
    );
  };

  const handleValueSalaryFromChange = (value) => {
    setValueSalaryFrom(value);
    setButtonResetDisabled(
      selectedIndustryValue === "" && valueSalaryTo === "" && value === ""
    );
  };

  const handleValueSalaryToChange = (value) => {
    setValueSalaryTo(value);
    setButtonResetDisabled(
      selectedIndustryValue === "" && value === "" && valueSalaryFrom === ""
    );
  };

  return (
    <form className="filters-form">
      <div className="filters">
        <h2>Фильтры</h2>
        <Button
        className="reset"
          rightIcon={
            buttonResetDisabled ? (
              <img src="img/Cross_gray.svg" />
            ) : (
              <img src="img/Cross_light_blue.svg" />
            )
          }
          variant="white"
          disabled={buttonResetDisabled}
          sx={{
            "&[data-disabled]": {
              background: "#ffff",
              color: "#ACADB9",
              fontFamily: "Inter",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "20px",
            },
          }}
          styles={(theme) => ({
            root: {
              border: "none",
              boxSizing: "border-box",
              width: "115px",
              height: "20px",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "20px",
              padding: "0px",
              color: "#92C1FF",
            },
            rightIcon: {
              margin: "0px",
            },
            inner: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
          })}
        >
          Сбросить все
        </Button>
      </div>
      <div className="industry">
        <h3>Отрасль</h3>
        <Select
          value={selectedIndustryValue}
          onChange={handleSelectChange}
          searchable
          clearable
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          nothingFound="Не найдено"
          rightSection={
            <img
              src={selectOpened ? "img/Arrow_up.svg" : "img/Arrow_down.svg"}
              onClick={() => {
                setSelectOpened(!selectOpened);
              }}
            />
          }
          styles={(theme) => ({
            input: {
              width: "275px",
              height: "42px",
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "20px",
              border: "1px solid #D5D6DC",
              borderRadius: "8px",
            },
            rightSection: {
              pointerEvents: "none",
            },
          })}
          placeholder="Выберете отрасль"
          data={[
            { value: "1", label: "IT, интернет, связь, телеком" },
            { value: "2", label: "Кадры, управление персоналом" },
            { value: "3", label: "Искусство, культура, развлечения" },
            { value: "4", label: "Банки, инвестиции, лизинг" },
            { value: "5", label: "Дизайн" },
          ]}
          onDropdownOpen={handleSelectOpen}
          onDropdownClose={handleSelectClose}
        />
      </div>
      <div className="salary">
        <h3>Оклад</h3>
        <NumberInput
          value={valueSalaryFrom}
          onChange={handleValueSalaryFromChange}
          handlersRef={handlersFrom}
          rightSection={
            <>
              <img
                className="arrow-up"
                src="img/Arrow_up_gray.svg"
                onClick={() => handlersFrom.current.increment()}
              />
              <img
                className="arrow-down"
                src="img/Arrow_down_gray.svg"
                onClick={() => handlersFrom.current.decrement()}
              />
            </>
          }
          styles={(theme) => ({
            input: {
              width: "275px",
              height: "42px",
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "20px",
              border: "1px solid #D5D6DC",
              borderRadius: "8px",
            },
            rightSection: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "2.25rem",
            },
          })}
          placeholder="От"
        />

        <NumberInput
          value={valueSalaryTo}
          onChange={handleValueSalaryToChange}
          handlersRef={handlersTo}
          rightSection={
            <>
              <img
                className="arrow-up"
                src="img/Arrow_up_gray.svg"
                onClick={() => handlersTo.current.increment()}
              />
              <img
                className="arrow-down"
                src="img/Arrow_down_gray.svg"
                onClick={() => handlersTo.current.decrement()}
              />
            </>
          }
          styles={(theme) => ({
            input: {
              width: "275px",
              height: "42px",
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "20px",
              border: "1px solid #D5D6DC",
              borderRadius: "8px",
            },
            rightSection: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "2.25rem",
            },
          })}
          placeholder="До"
        />
      </div>

      <Button
      className="apply"
        disabled={buttonApplyDisabled}
          sx={{ '&[data-disabled]': { background: '#92C1FF', color: '#FFFFFF', fontFamily: 'Inter', fontWeight: '500', fontSize: '14px', lineHeight: '21px', borderRadius: '8px' } }}
        styles={(theme) => ({
          root: {
            width: "275px",
            height: "40px",
            background: "#5E96FC",
            borderRadius: "8px",
            fontFamily: "Inter",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "21px",
            textAlign: "center",
            color: "#FFFFFF",
          },
        })}
      >
        Применить
      </Button>
    </form>
  );
};

export default FiltersForm;
