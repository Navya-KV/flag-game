import React, { useEffect, useState } from 'react'
//import axios from 'axios';

function Countries() {

    const API_BASE_URL = 'https://restcountries.com/v3.1/all';
    const [countries, setCountries] = useState([]);

    useEffect(() => {
      console.log('response')
         fetch(API_BASE_URL).then((res) => {console.log('res',res)})
        //const countriesJson = await response.json()
        // console.log(countriesJson);
        // setCountries(countriesJson);
      
    }, []);
    console.log('countries',countries);
  
    const answers = [];
    const flagCount = countries.length;

    console.log('flagcount',flagCount);
    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * flagCount);
        const randomFlag = countries[randomIndex];
        answers.push(randomFlag);
    }
    //console.log(answers);
    
    function setDifference(countries, answers) {
      return countries.filter(item => !answers.includes(item));
    }
    const difference = setDifference(countries, answers);
    console.log(difference);

  return (
    
    <div>
      {answers.map((country, index) => (

      <div className='container' key={index}>
        <button className='left'>{country.name.common}</button>
        <img className='center' src={country.flags.png} alt={country.flags.alt}/>
        <button className='right'>{country.name.common}</button>
      </div>
      ))}
    </div>
  )
}

export default Countries;
