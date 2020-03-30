import React, { useState } from 'react';
import './App.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Checkbox } from './Checkbox';
import { Button } from 'reactstrap';

const cities = [
  'Prague',
  'Berlin',
  'Warsaw',
  'Pardubice',
  'Valencia',
  'Barcelona',
  'Madrid',
  'Milano',
  'Athens'
];

const DDMenu = ({title, items, handle}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const select = (e) => {
    handle(e.target.innerText);
  }
  const list = items.map((item, index) => {
    return <DropdownItem key={`dest-${index}`} onClick={select}>{item}</DropdownItem>
  });
  return (
    <div style={padding}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret>
          {title}
          </DropdownToggle>
        <DropdownMenu>
          {list}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export const SearchBar = ({searchClicked, departure, setDeparture, destination, setDestination, cSelected, setCSelected}) => {

  return(
    <div style={menu}>
        <DDMenu title={departure} items={cities} handle={setDeparture}/>
        <DDMenu title={destination} items={cities} handle={setDestination}/>
      <div style={padding}>
        <Checkbox cSelected={cSelected} setCSelected={setCSelected} />
      </div>
      <div style={padding}>
        <Button onClick={searchClicked}>Search</Button>
      </div>
    </div>
  );
}

const padding = {
  padding: '5px',
}
const menu = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}