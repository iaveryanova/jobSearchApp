import React from 'react'
import './SearchForm.css'

const SearchForm = () => {
  return (
    <div className="search">
        <img src="img/Search.png" alt=""></img>
        <input
          type="text"
          className="input-search"
          placeholder="Введите название вакансии"
        />

        <button className="btn-search">Поиск</button>
      </div>
  )
}

export default SearchForm