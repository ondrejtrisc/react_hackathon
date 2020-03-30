import React from 'react';
import './App.css';
import { DateTime } from 'luxon';
import { Table } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { Button } from 'reactstrap';

export const DisplayFlights = ({flights, display, cSelected, offset, setOffset}) =>{
  
  if (display === 'empty') {
    return <></>;
  }
  
  if (display === 'loading') {
    return (
      <Loader />
    );
  }

  if (flights == null ) {
    return <></>;
  }

  if(cSelected){
    flights = flights.filter((flight)=>{
      return flight.route.length === 1;
    });
  }

  if (flights.length === 0 ) {
    return <h3>Sorry, there are no flights.</h3>;
  }

  const rows = flights.map((flight, index) => {
    const dTime = DateTime.fromMillis(flight.dTime * 1000).toFormat('dd/MM hh:mm')
    const aTime = DateTime.fromMillis(flight.aTime * 1000).toFormat('dd/MM hh:mm')
      return (
        <tr key={index}>
          <td>{flight.flyFrom}</td>
          <td>{flight.flyTo}</td>
          <td>{dTime}</td>
          <td>{aTime}</td>
          <td>{flight.price}</td>
          <td>{flight.route.length-1}</td>
        </tr>
      );
  });
  
  const next = () => {
    setOffset(offset+10)
  };

  console.log(rows);
  return(
    <>
      <Table>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Destination</th>
            <th>Time of departure</th>
            <th>Time of arrival</th>
            <th>Price</th>
            <th>No. of stopovers</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
      <Button onClick={next}>Next</Button>
    </>
  );
}

const loading = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

function Loader() {
  return (
    <div style={loading}>
      <Spinner color="primary" />
      <p>Loading...</p>
    </div>
  );
}
