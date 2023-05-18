import React, { useState, useEffect } from "react";
import "./Home.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import { Pagination } from "@mantine/core";
import http from "../../http";

export const SearchContext = React.createContext(null);

const Home = () => {
  const [vacancies, setVacancies] = useState([]);

  const token = localStorage.getItem('token');

  const getVacancies = async (keyword='', payment_from='', payment_to='', catalogues='') => {
    let vacanciesData = await http.get(`/vacancies/?published=1&no_agreement=1&count=500&catalogues=${catalogues}&keyword=${keyword}&payment_from=${payment_from}&payment_to=${payment_to}`, 
    {headers:{
      'Authorization': `Bearer ${token}`
  }});

    let outputVacancies = vacanciesData.data.objects.map((item) => {
      return {
        profession: item.profession,
        salary: item.payment_from,
        schedule: item.type_of_work.title,
        location: item.town.title,
        id: item.id,
      };
    });

    setVacancies(outputVacancies);
  };

  useEffect(() => {
    getVacancies();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vacancies.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedIndustryValue, setSelectedIndustryValue] = useState("");
  const [valueSalaryFrom, setValueSalaryFrom] = useState("");
  const [valueSalaryTo, setValueSalaryTo] = useState("");
  const [inputValue, setInputValue] = useState("");

  return (
    <SearchContext.Provider value={ {selectedIndustryValue:selectedIndustryValue, setSelectedIndustryValue:setSelectedIndustryValue, valueSalaryFrom:valueSalaryFrom, setValueSalaryFrom:setValueSalaryFrom, valueSalaryTo:valueSalaryTo, setValueSalaryTo:setValueSalaryTo, inputValue:inputValue, setInputValue:setInputValue } } >
      <div className="search-page">
        <FiltersForm getVacancies={getVacancies}/>
        <div className="vacancies">
          <SearchForm getVacancies={getVacancies}/>

          {currentItems.map((item) => {
            const { id, ...itemProps } = item;
            return <VacancyCard key={id} id={id} {...itemProps} />;
          })}

          <Pagination
            position="center"
            className="pagination"
            total={Math.ceil(vacancies.length / itemsPerPage)}
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
    </SearchContext.Provider>
  );
};

export default Home;
