import React, { useEffect, useState } from 'react'
//import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1/all';

function shuffle(array) {
  let currentIndex = array.length;

  while(currentIndex !== 0){
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex],array[currentIndex]];
  }
}

function Countries() {
    
    const [countries, setCountries] = useState([]);
    const [randomCountries,setRandomCountries] = useState([]);
    const [randomAnswerFlags, setRandomAnswerFlags] = useState([]);

    useEffect(() => {
      console.log("effect1");
      const fetchData = async () => {
        try{
          const response = await fetch(API_BASE_URL);
          setCountries(await response.json());
        }catch{
          console.error("cannot fetch countries");
        }
      }
      fetchData();
    }, []);



    useEffect(() => {
      console.log("effect2");
      let randomFlags = [];
      if(countries.length > 0 ){
      const flagCount = countries.length;
      // console.log('flagcount',flagCount);
      
      for (let i = 0; i < 15; i++) {
          const randomIndex = Math.floor(Math.random() * flagCount);
          const randomFlag = countries[randomIndex];
          randomFlags.push(randomFlag);
      }
      setRandomCountries(randomFlags);

    }
    }, [countries]);


     useEffect(() => {
      if(randomCountries){
        const difference = countries.reduce((result, element) => {
          if (randomCountries.indexOf(element) === -1) {
              result.push(element);
          }
          return result;
        }, []);
   
        const randomAnswers = [];
        for(let i=0;i<randomCountries.length;i++){
          let item = [randomCountries[i],difference[Math.floor(Math.random() * difference.length)]];
          shuffle(item);
          item.push(randomCountries[i]);
          randomAnswers.push(item);
        }
        setRandomAnswerFlags(randomAnswers);
      }
     }, [randomCountries])

  return (
    <>
      {randomAnswerFlags.map((option, index) => (
    
        <div className='container' key={index}>
          <button className='left'>{option[0].name.common}</button>
          <img className='center' src={option[2].flags.png} alt={option[2].flags.alt}/>
          <button className='right'>{option[1].name.common}</button>
        </div>
      ))}
    </>
  )
}

export default Countries;