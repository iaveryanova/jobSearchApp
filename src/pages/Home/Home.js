import React, {useState} from "react";
import "./Home.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import { Pagination } from "@mantine/core";

const Home = () => {
  const data = [
    {
      title: "Менеджер-дизайнер",
      salary: "з/п от 7000 rub",
      schedule: "Полный рабочий день",
      location: "Новый Уренгой",
      id: 1,
    },
    {
      title: "Ведущий дизайнер",
      salary: "з/п от 7000 rub",
      schedule: "Полный рабочий день",
      location: "Новый Уренгой",
      id: 2,
    },
    {
      title: "Младший дизайнер",
      salary: "з/п от 7000 rub",
      schedule: "Полный рабочий день",
      location: "Новый Уренгой",
      id: 3,
    },
    {
      title: "Старший дизайнер",
      salary: "з/п от 7000 rub",
      schedule: "Полный рабочий день",
      location: "Новый Уренгой",
      id: 4,
    },
    {
      title: "Помощник дизайнера",
      salary: "з/п от 7000 rub",
      schedule: "Полный рабочий день",
      location: "Новый Уренгой",
      id: 5,
    },
    {
      title: "Помощник дизайнера",
      salary: "з/п от 7000 rub",
      schedule: "Полный рабочий день",
      location: "Новый Уренгой",
      id: 6,
    },
    {
      title: "Помощник дизайнера",
      salary: "з/п от 7000 rub",
      schedule: "Полный рабочий день",
      location: "Новый Уренгой",
      id: 7,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="search-page">
      <FiltersForm />
      <div className="vacancies">
        <SearchForm />

        {currentItems.map((item) => {
          const { id, ...itemProps } = item;
          return <VacancyCard key={id} {...itemProps} />;
        })}

        <Pagination
          position="center"
          className="pagination"
          total={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={setCurrentPage}
          styles={(theme) => ({
            control: {
              "&[data-active]": {
                background: "#5E96FC",
                border: "1px solid #5E96FC",
                borderRadius: "4px",
              },
            },
          })}
        />
      </div>
    </div>
  );
};

export default Home;
