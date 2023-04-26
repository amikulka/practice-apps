import React from 'react';
const{useState} = React;


function AddressForm ({customerInfo, updateInfo, setCurrentPage}) {

  let [lineOne, setLineOne] = useState('');
  let [lineTwo, setLineTwo] = useState('');
  let [city, setCity] = useState('');
  let [state, setState] = useState('');
  let [zipcode, setZipcode] = useState('');
  let [phone, setPhone] = useState('');


  function handleLineOneChange (e) {
    e.preventDefault();
    setLineOne(e.target.value);
  }
  function handleLineTwoChange (e) {
    e.preventDefault();
    setLineTwo(e.target.value);
  }
  function handleCityChange (e) {
    e.preventDefault();
    setCity(e.target.value);
  }
  function handleStateChange (e) {
    e.preventDefault();
    setState(e.target.value);
  }
  function handleZipChange (e) {
    e.preventDefault();
    setZipcode(e.target.value);
  }
  function handlePhoneChange (e) {
    e.preventDefault();
    setPhone(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    let newInfo = Object.assign(customerInfo);
    newInfo.address_line1 = lineOne;
    newInfo.address_line2 = lineTwo;
    newInfo.city = city;
    newInfo.state = state;
    newInfo.zipcode = zipcode;
    newInfo.phone = phone;
    updateInfo('/updateAddress', newInfo);
    setCurrentPage('credit');
  }

  return (
    <div>
      <form>
        <label for='line1'>Address Line 1: </label>
        <input type='text' id='line1' onChange={handleLineOneChange} value={lineOne}></input>
        <label for='line2'>Address Line 2: </label>
        <input type='text' id='line2' onChange={handleLineTwoChange} value={lineTwo}></input>
        <label for='city'>City: </label>
        <input type='text' id='city' onChange={handleCityChange} value={city}></input>
        <label for='state'>State: </label>
        <input type='text' id='state' onChange={handleStateChange} value={state}></input>
        <label for='zip'>Zipcode: </label>
        <input type='text' id='zip' onChange={handleZipChange} value={zipcode}></input>
        <label for='phone'>Phone: </label>
        <input type='text' id='phone' onChange={handlePhoneChange} value={phone}></input>
        <button type='submit' onClick={handleSubmit}>Next</button>
      </form>
    </div>
  );

}


export default AddressForm;