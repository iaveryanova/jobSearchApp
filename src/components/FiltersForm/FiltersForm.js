import React from "react";
import "./FiltersForm.css";
import { Select } from "@mantine/core";

const FiltersForm = () => {
  return (
    <div className="filters-form">
      <div className="filters">
        <h2>Фильтры</h2>
        <button>
          Сбросить все
          <img src="img/Cross_grey.png" />
        </button>
      </div>
      <div className="industry">
        <h3>Отрасль</h3>
        <Select
        styles={(theme) => ({
            input: {
                width: '275px',
                height: '42px',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '20px',
                border: '1px solid #D5D6DC',
                borderRadius: '8px'
            }
            })}
          placeholder="Выберете отрасль"
          data={[
            { value: "1", label: "IT, интернет, связь, телеком" },
            { value: "2", label: "Кадры, управление персоналом" },
            { value: "3", label: "Искусство, культура, развлечения" },
            { value: "4", label: "Банки, инвестиции, лизинг" },
            { value: "4", label: "Дизайн" },
          ]}
        />
      </div>
      <div className="salary">
        <h3>Оклад</h3>
        <Select
        styles={(theme) => ({
            input: {
                width: '275px',
                height: '42px',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '20px',
                border: '1px solid #D5D6DC',
                borderRadius: '8px'
            }
            })}
          placeholder="От"
          data={[
            { value: "1", label: "100" },
            { value: "2", label: "200" },
            { value: "3", label: "300" },
            { value: "4", label: "400" },
            { value: "4", label: "500" },
          ]}
        />
        <Select
        styles={(theme) => ({
            input: {
                width: '275px',
                height: '42px',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '20px',
                border: '1px solid #D5D6DC',
                borderRadius: '8px'
            }
            })}
          placeholder="До"
          data={[
            { value: "1", label: "100" },
            { value: "2", label: "200" },
            { value: "3", label: "300" },
            { value: "4", label: "400" },
            { value: "4", label: "500" },
          ]}
        />
      </div>
      <button className="apply">Применить</button>
    </div>
  );
};

export default FiltersForm;
