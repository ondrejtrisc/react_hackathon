import React, { useState, useEffect } from 'react';
import './App.css';
import {DisplayFlights} from './DisplayFlights';
import {SearchBar} from './SearchBar';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [display, setDisplay] = useState('empty');
  const [departure, setDeparture] = useState('Departure');
  const [destination, setDestination] = useState('Destination');
  const [cSelected, setCSelected] = useState(false);
  const [offset, setOffset] = useState(0);

  const code = {
    'Prague': 'PRG',
    'Berlin': 'BER',
    'Warsaw': 'WAW',
    'Pardubice': 'PED',
    'Valencia': 'VLC',
    'Barcelona': 'BCN',
    'Madrid': 'MAD',
    'Milano': 'MIL',
    'Athens': 'ATH'
  };
  const query = new URLSearchParams({
    partner: 'picky',
    flyFrom: code[departure],
    to: code[destination],
    limit: 10,
    offset: offset
  })


  const url = new URL(`?${query}`, 'https://api.skypicker.com/flights');

  const getSearchResults = async () => {
    setDisplay('loading');
    try{
      const response = await fetch(url);
      const data = await response.json();
      const flights = data.data;
      setFlights(flights);
      setDisplay('table');
    }catch (err){
      console.log(err);
    }
  };

  function searchClicked(){
    if (destination !== 'Destination' && departure !== 'Departure'){
      setOffset(0);
      getSearchResults();
    }else{
      alert('"Destination" or "Departure" is not selected!');
    }
  }

  useEffect(
    () => {
      getSearchResults();
    }, [offset]
  )

  return (
    <div className="App">
      <SearchBar searchClicked={searchClicked} departure={departure} destination={destination} setDeparture={setDeparture} 
      setDestination={setDestination} cSelected={cSelected} setCSelected={setCSelected}/>
      <DisplayFlights flights={flights} display={display} cSelected={cSelected} setCSelected={setCSelected} offset={offset} setOffset={setOffset}/>
    </div>
  );
}

export default App;
