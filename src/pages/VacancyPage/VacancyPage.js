import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import "./VacancyPage.scss";
import { Loader } from "@mantine/core";

const VacancyPage = () => {
  const token = localStorage.getItem("token");
  let { id } = useParams();

  let [profession, setProfession] = useState("");
  let [salaryFrom, setSalaryFrom] = useState("");
  let [salaryTo, setSalaryTo] = useState("");
  let [schedule, setSchedule] = useState("");
  let [location, setLocation] = useState("");
  let [informationForCandidate, setInformationForCandidate] = useState("");
  let [idVacancy, setIdVacancy] = useState("");

  const getVacancy = async () => {
    let vacancyData = await http.get(`/vacancies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setInformationForCandidate(vacancyData.data.vacancyRichText);
    setProfession(vacancyData.data.profession);
    setSalaryFrom(vacancyData.data.payment_from);
    setSalaryTo(vacancyData.data.payment_to);
    setSchedule(vacancyData.data.type_of_work.title);
    setLocation(vacancyData.data.town.title);
    setIdVacancy(vacancyData.data.id);
  };

  useEffect(() => {
    getVacancy();
  }, []);

  return (
    <div className="vacancy-page">
      {profession ? (
        <>
          <VacancyCard
            className="vacancy-page-card"
            id={idVacancy}
            profession={profession}
            salaryFrom={salaryFrom}
            salaryTo={salaryTo}
            schedule={schedule}
            location={location}
          />

          <div
            className="info-candidate"
            dangerouslySetInnerHTML={{ __html: informationForCandidate }}
          ></div>
        </>
      ) : (
        <Loader className="loader" />
      )}
    </div>
  );
};

export default VacancyPage;
