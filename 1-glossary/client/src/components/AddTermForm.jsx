import React from 'react';
const {useState} = React;

function AddTermForm ({addTerm}) {
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
  if (termInput === '' || defInput === '') return;
  // call prop function to send post request
  addTerm(termInput, defInput);
  setTermInput('');
  setDefInput('');

}

  return (
    <div>
      <form className='addTermForm'>
        <input className='termTextInput' type='text' onChange={handleTermChange} value={termInput} placeholder='Enter Term'></input>
        <textarea className='defTextInput' type='text' onChange={handleDefChange} value={defInput} placeholder='Enter Definition'></textarea>
        <button className='addTermButton' type='submit' onClick={handleSubmit}>ADD TERM</button>
      </form>
    </div>
  );
}


export default AddTermForm;