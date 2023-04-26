import React from 'react';
const {useState} = React;


function SignUpForm ({customerInfo, updateInfo, setCurrentPage}) {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');


  function handleNameChange (e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleEmailChange (e) {
    e.preventDefault();
    setEmail(e.target.value);
  }
  function handlePasswordChange (e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  function handleSubmit (e) {
    e.preventDefault();
    let newInfo = Object.assign(customerInfo);
    newInfo.name = name;
    newInfo.email = email;
    newInfo.password = password;
    updateInfo('/updateLogin', newInfo);
    setCurrentPage('address');
  }

  return (
    <div>
      <form>
        <label for='name'>Name: </label>
        <input type='text' id='name' placeholder='Enter full name' onChange={handleNameChange} value={name}></input>
        <label for='email'>Email: </label>
        <input type='text' id='email' placeholder='Enter email' onChange={handleEmailChange} value={email}></input>
        <label for='password'>Password: </label>
        <input type='text' id='password' placeholder='Enter password' onChange={handlePasswordChange} value={password}></input>
        <button type='submit' onClick={handleSubmit}>Next</button>
      </form>
    </div>
  );
}


export default SignUpForm;