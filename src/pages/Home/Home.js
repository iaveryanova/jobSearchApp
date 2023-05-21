import React, { useState, useEffect } from "react";
import "./Home.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import { Pagination } from "@mantine/core";
import http from "../../http";
import { Loader } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";

export const SearchContext = React.createContext(null);

const Home = () => {
  const [vacancies, setVacancies] = useState([]);
  const [totalVacancies, setTotalVacancies] = useState(null);
  const [searchParams] = useSearchParams();
  const itemsPerPage = 4;

  const token = localStorage.getItem("token");

  const getVacancies = async (
    keyword = "",
    payment_from = "",
    payment_to = "",
    catalogues = "",
    page = 1
  ) => {
    if (
      !(
        keyword === "" &&
        payment_from === "" &&
        payment_to === "" &&
        catalogues === "" &&
        page === 1
      )
    ) {
      let newUrl = `/?catalogues=${catalogues}&keyword=${keyword}&payment_from=${payment_from}&payment_to=${payment_to}&page=${page}`;
      window.history.replaceState(null, "", newUrl);
    }
    setTotalVacancies(null);

    let vacanciesData = await http.get(
      `/vacancies/?published=1&no_agreement=1&count=${itemsPerPage}&page=${
        page - 1
      }&catalogues=${catalogues}&keyword=${keyword}&payment_from=${payment_from}&payment_to=${payment_to}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCurrentPage(page);
    setTotalVacancies(
      vacanciesData.data.total > 500 ? 500 : vacanciesData.data.total
    );
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
    const initIndustry = searchParams.get("catalogues")
      ? parseInt(searchParams.get("catalogues"))
      : "";
    const initSalaryFrom = searchParams.get("payment_from")
      ? parseInt(searchParams.get("payment_from"))
      : "";
    const initSalaryTo = searchParams.get("payment_to")
      ? parseInt(searchParams.get("payment_to"))
      : "";
    const initKeyword = searchParams.get("keyword") ?? "";
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page"))
      : 1;

    setSelectedIndustryValue(initIndustry);
    setValueSalaryFrom(initSalaryFrom);
    setValueSalaryTo(initSalaryTo);
    setCurrentPage(page);
    setInputValue(initKeyword);
    getVacancies(initKeyword, initSalaryFrom, initSalaryTo, initIndustry, page);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const currentItems = vacancies;

  const [selectedIndustryValue, setSelectedIndustryValue] = useState();
  const [valueSalaryFrom, setValueSalaryFrom] = useState();
  const [valueSalaryTo, setValueSalaryTo] = useState();
  const [inputValue, setInputValue] = useState();

  const changePage = (value) => {
    getVacancies(
      inputValue,
      valueSalaryFrom,
      valueSalaryTo,
      selectedIndustryValue,
      value
    );
    console.log("change", value);
  };

  return (
    <SearchContext.Provider
      value={{
        selectedIndustryValue: selectedIndustryValue,
        setSelectedIndustryValue: setSelectedIndustryValue,
        valueSalaryFrom: valueSalaryFrom,
        setValueSalaryFrom: setValueSalaryFrom,
        valueSalaryTo: valueSalaryTo,
        setValueSalaryTo: setValueSalaryTo,
        inputValue: inputValue,
        setInputValue: setInputValue,
      }}
    >
      <div className="search-page">
        <FiltersForm getVacancies={getVacancies} />
        <div className="vacancies">
          <SearchForm getVacancies={getVacancies} />

          {totalVacancies > 0 ? (
              currentItems.map((item) => {
                const { id, ...itemProps } = item;
                return <VacancyCard key={id} id={id} {...itemProps} />;
              })
            ) : totalVacancies == 0 ? (
              <NotFound />
            ) : (
              <Loader className="loader" />
            )
          }

          <Pagination
            value={currentPage}
            position="center"
            className="pagination"
            total={Math.ceil(totalVacancies / itemsPerPage)}
            onChange={changePage}
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
