import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import VacancyCard from "../VacancyCard/VacancyCard";
import "./VacancyPage.css";
import { Loader } from "@mantine/core";

const VacancyPage = () => {
  const token = localStorage.getItem("token");
  let { id } = useParams();

  let [profession, setProfession] = useState("");
  let [salary, setSalary] = useState("");
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

    console.log(vacancyData.data);
    setInformationForCandidate(vacancyData.data.vacancyRichText);
    setProfession(vacancyData.data.profession);
    setSalary(vacancyData.data.payment_from);
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
            salary={salary}
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
