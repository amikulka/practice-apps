import React from 'react';
const {useState} = React;

function AddTermForm () {
const [termInput, setTermInput] = useState('');
const [defInput, setDefInput] = useState('');

function handleTermChange(e) {
  e.preventDefault();
  setTermInput(e.target.value);
}
function handleDefChange(e) {
  e.preventDefault();
  setDefInput(e.target.value);
}
function handleSubmit(e) {
  e.preventDefault();
  // call prop function to send post request

  setTermInput('');
  setDefInput('');

}

  return (
    <div>
      <form>
        <input type='text' onChange={handleTermChange} value={termInput}></input>
        <input type='text' onChange={handleDefChange} value={defInput}></input>
        <button type='submit' onClick={handleSubmit}>ADD TERM</button>
      </form>
    </div>
  );
}


export default AddTermForm;