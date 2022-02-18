import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from './Card';

const Countries = () => {
    // declarer une nouvelle variable d'état, qu'on va appeler "data"
    const [data, setData] = useState([]);    
    const [sortedData, setSortedData] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [rangeValue, setRangeValue] = useState(40);
    const [selectedRadio, setSelectedRadio] = useState('');
    const radios = ['Africa', "Europe", "Asia", "Americas", "Oceania"];
   
    useEffect(() => {
      if(playOnce) {
        axios.get(
          "https://restcountries.com/v2/all?fields=name,population,region,capital,flags"
          )
        .then((res) =>{
          setData(res.data);
          setPlayOnce(false);
        });
      }
        
      const sortedCountry = () => {
        const countryObj = Object.keys(data).map((i) =>
        data[i]);
        const sortedArray = countryObj.sort((a,b) => {
          return b.population - a.population;
        });
        sortedArray.length = rangeValue;
        setSortedData(sortedArray);
      }
       
      sortedCountry();
    }, [data, rangeValue, playOnce]);

        
    return (
        <div className="countries">
          <div className='sort-container'>
            <input type="range" min="1" max="250" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
            <ul>
              {radios.map((radio) => {
                 return (
                  <li key={radio}>
                      <input type="radio" id={radio} value={radio} 
                      checked = {radio === selectedRadio} onChange={(e) => setSelectedRadio(e.target.value)} />
                      <label htmlFor={radio}>{radio}</label>
                  </li>
                 );
              }
              )}
            </ul>
          </div>
          
          <ul className="countries-list">         
            {sortedData
              .filter((country) => country.region.includes(selectedRadio))
              .map((country)=> (
              <Card country={country} key={country.name}  />
            ))}         
          </ul>
        </div>
    );
};

// const Countries = () => {
//   // declarer une nouvelle variable d'état, qu'on va appeler "data"
//   const [data, setData] = useState([]);

//   useEffect(() => {
//       axios.get(
//         "https://restcountries.com/v2/all?fields=name,population,region,capital,flags"
//         )
//       .then((res) =>{
//         setData(res.data);
//         console.log(res.data);
//       });
//   }, []);

//     return (

//         <div className="countries">
//           <ul className="countries-list">
//             {data.map((country)=> (
//                 <><li>{country.name}</li>
//                 <li><img src={country.flags.png} alt="" /></li></>
//             ))}
//           </ul>
//         </div>
//     );
// };

export default Countries;