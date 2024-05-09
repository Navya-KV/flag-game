import React, { useState, useEffect } from 'react';

const AppFlag = () => {
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [flagUrl, setFlagUrl] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    setSelectedCountry(selectedCountryCode);

    const selectedCountryData = countryData.find(
      (country) => country.cca2 === selectedCountryCode
    );
    if (selectedCountryData) {
      setFlagUrl(selectedCountryData.flags.png);
    }
  };

  return (
    <div>
      <h1>Country Flag Viewer</h1>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        {countryData.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
      {flagUrl && (
        <div>
          <h2>Flag</h2>
          <img src={flagUrl} alt="Flag" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default AppFlag;


//   useEffect(() =>{
  //     const fetchData = async () => {
  //      try{
  //       const response = await axios.get(API_BASE_URL);
  //       const data = await response.json();
  //       console.log(response.data);
  //       setFlag(data);
  //      }
  //      catch(error){
  //       console.error('Error fetching countries:', error);
  //      }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   axios.get(API_BASE_URL).then((response)=>{
  //     console.log(response.data);
  //     setFlag(response.data)
  //   })
  // }, [])  

  //--------------------------------------------------
  // <div>
  //       <h1>Identify the Country of the flag given below</h1>
        {/* {countries.map((country) => {
          const {numericCode, flag, name} = country

          return <article key={numericCode}>
            <div>
              <img src={flag} alt={name}/>
            </div>
          </article>
        })} */}
        
    //</div>

    // {countries.map((country) => {
    //   const { id } = country

    //   return(
    //     <article key={ id }>
          
    //       <div>
    //         <img src= {id} alt={id}/>
    //         <h3>name</h3>
    //       </div>
    //     </article>
    //   )
    // })}