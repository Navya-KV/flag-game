import React, { useEffect, useState } from 'react'
//import axios from 'axios';

function Countries() {

    const API_BASE_URL = 'https://restcountries.com/v3.1/all';
    const [countries, setCountries] = useState([]);
    const flag = countries.slice(0,10);

    const randomFlags = [];
    const flagCount = countries.length;

    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * flagCount);
        const randomFlag = countries[randomIndex];
        randomFlags.push(randomFlag);
    }

    console.log(randomFlags.length);
    
    

    useEffect(() => {
      const fetchCountryData = async() => {
        const response = await fetch(API_BASE_URL)
        const countries = await response.json()
        setCountries(countries)
        //console.log(countries);
      }
      fetchCountryData()
    }, []);

    
  

  return (
    <>
      {flag.map((country, index) => (

        <div key={index}>
          <button handleSubmit>{}</button>
          <img src={country.flags.png} alt={country.flags.alt}/>
          <h3>{country.name.common}</h3>
        </div>
      ))}
    </>
  )
}

export default Countries;