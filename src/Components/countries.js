import React, { useEffect, useState } from 'react'

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
    const [randomCountries, setRandomCountries] = useState([]);
    const [randomAnswerFlags, setRandomAnswerFlags] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [score, setScore] = useState(0);
    const [life, setLife] = useState(5);
    
    

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
      }, [countries,randomCountries])

     
      
      const handleClick = (option,optIndex,index) => {

          if(option[optIndex].name.common === option[2].name.common){
            setScore(score+1);
            alert('correct'); 
          }
          else{
            setLife(life-1);
            alert('wrong');
          }
          console.log('indices:',index);
          setDisabledButtons(disabledButtons => [...disabledButtons,index]);
          
        }

     console.log('disabledButtons:', disabledButtons.length);
     console.log('randomAnswerFlags:',randomAnswerFlags.length);


  return (
    <>
    <header><h1>FLAG GAME</h1></header>
    <nav><h2 className='score'>Score: {score}</h2><h2 className='life'>Life: {life}</h2></nav>
    {score !== 15 ?
      <section>
      {disabledButtons.length !== 15 && (life !== 0) ?
      <div className='containerBody'>
      {randomAnswerFlags.map((option, index) => (
        <div className='container' key={index}>
          <button className='left' onClick={() => handleClick(option,0,index)} disabled={disabledButtons.includes(index)}>{option[0].name.common}</button>
          <img className='center' src={option[2].flags.png} alt={option[2].flags.alt}/>
          <button className='right' onClick={() =>handleClick(option,1,index)} disabled={disabledButtons.includes(index)}>{option[1].name.common}</button>
        </div>
      ))}
      </div>: <h1>Game Over!!!</h1>}
      </section>: <h1>You Win!!!</h1>}
    </>
  )
}

export default Countries;