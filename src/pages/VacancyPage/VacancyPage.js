import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import "./VacancyPage.scss";
import { Loader } from "@mantine/core";

const VacancyPage = () => {
  const token = localStorage.getItem("token");
  let { id } = useParams();

  let [vacancyInfo, setVacancyInfo] = useState("");

  const getVacancy = async () => {
    const vacancyData = await http.get(`/vacancies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setVacancyInfo(vacancyData.data);
  };

  useEffect(() => {
    getVacancy();
  }, []);

  return (
    <div className="vacancy-page">
      {vacancyInfo.profession ? (
        <>
          <VacancyCard
            className="vacancy-page-card"
            id={vacancyInfo.id}
            profession={vacancyInfo.profession}
            salaryFrom={vacancyInfo.payment_from}
            agreement={vacancyInfo.agreement}
            salaryTo={vacancyInfo.payment_to}
            schedule={vacancyInfo.type_of_work.title}
            location={vacancyInfo.town.title}
          />

          <div
            className="info-candidate"
            dangerouslySetInnerHTML={{ __html: vacancyInfo.vacancyRichText }}
          ></div>
        </>
      ) : (
        <Loader className="loader" />
      )}
    </div>
  );
};

export default VacancyPage;
