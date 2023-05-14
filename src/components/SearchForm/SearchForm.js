import React, {useState} from 'react'
import './SearchForm.css'
import { Button } from '@mantine/core';

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonHover = () => {
    setIsButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setIsButtonHovered(false);
  };
  return (
    <div className="search">
        <img src="img/Search.svg" alt=""></img>
        <input
          type="text"
          className="input-search"
          placeholder="Введите название вакансии"
          value={inputValue}
          onChange={handleInputChange}
        />

        <Button
        onMouseEnter={inputValue ? handleButtonHover : null}
        onMouseLeave={inputValue ? handleButtonLeave : null}        disabled ={!inputValue}
          sx={{ '&[data-disabled]': { background: '#92C1FF', color: '#FFFFFF', fontFamily: 'Inter', fontWeight: '500', fontSize: '14px', lineHeight: '21px', borderRadius: '8px' } }}
      styles={(theme) => ({
        root: {
            width: '83px',
            height: '32px',
              background: inputValue && isButtonHovered ? '#3B7CD3' : '#5E96FC',
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
        },
        })}>
      Поиск
      </Button>
      </div>
  )
}

export default SearchForm