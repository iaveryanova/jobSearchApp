import React from "react";
import "./FiltersForm.css";
import { Select } from "@mantine/core";
import { Button } from '@mantine/core';



const FiltersForm = () => {
  return (
    <div className="filters-form">
      <div className="filters">
        <h2>Фильтры</h2>
        <Button 
        rightIcon={<img src="img/Cross_grey.svg" />} 
        variant="white"
         styles={(theme) => ({
            root: {
                border: 'none',
                boxSizing: 'border-box',
                width: '115px',
                height: '20px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '20px',
                padding: '0px',
                color: '#ACADB9'
            },
            rightIcon: {
                margin: '0px'
            },
            inner: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }
            })}
        >
      Сбросить все
    </Button>
      </div>
      <div className="industry">
        <h3>Отрасль</h3>
        <Select
        rightSection={<img src="img/Arrow_down.svg" />}
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
        rightSection={<img src="img/Arrows.svg" />}
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
        rightSection={<img src="img/Arrows.svg" />}
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
      {/* <button className="apply">Применить</button> */}
      <Button
      styles={(theme) => ({
        root: {
            width: '275px',
            height: '40px',
            background: '#5E96FC',
            borderRadius: '8px',
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '21px',
            textAlign: 'center',
            color: '#FFFFFF'
        }
        })}>
      Применить
    </Button>
    </div>
  );
};

export default FiltersForm;
