import React from 'react'
import './SearchForm.css'
import { Button } from '@mantine/core';

const SearchForm = () => {
  return (
    <div className="search">
        <img src="img/Search.svg" alt=""></img>
        <input
          type="text"
          className="input-search"
          placeholder="Введите название вакансии"
        />

        <Button
      styles={(theme) => ({
        root: {
            width: '83px',
            height: '32px',
            background: '#5E96FC',
            borderRadius: '8px',
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '21px',
            textAlign: 'center',
            color: '#FFFFFF',
            border: 'none',
            padding: '4px 20px'
        },
        inner: {
          width: '43px'
        }
        })}>
      Поиск
      </Button>
      </div>
  )
}

export default SearchForm