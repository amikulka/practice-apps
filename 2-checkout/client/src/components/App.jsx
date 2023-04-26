import React from 'react';
import axios from 'axios';
import Home from './Home.jsx';
import SignUpForm from './SignUpForm.jsx';
import AddressForm from './AddressForm.jsx';
import CreditForm from './CreditForm.jsx';
import Summary from './Summary.jsx';

const {useState, useEffect} = React;
const pages = {
  home: Home,
  signup: SignUpForm,
  address: AddressForm,
  credit: CreditForm,
  summary: Summary
}

function App () {
  const [currentPage, setCurrentPage] = useState('');
  const [customerInfo, setCustomerInfo] = useState({});
  let CurrentPage;

  function setSession() {
    return axios.post('/session')
      .catch(err => {console.log(err)});
  }

  function updateInfo(route, customerInfo) {
    axios.put(route, customerInfo);
  }

  function retreiveCustomerInfo() {
    return axios.get('/customer')
      .then((result) => {
        setCustomerInfo(result.data);
      })
      .catch(err => {console.log(err)});
  }
  function getCurrentPage () {
    switch (currentPage) {
      case 'signup':
        return <SignUpForm customerInfo={customerInfo}
          updateInfo={updateInfo} setCurrentPage={setCurrentPage}/>
        break;
      case 'address':
        return <AddressForm customerInfo={customerInfo}
        updateInfo={updateInfo} setCurrentPage={setCurrentPage}/>
        break;
      case 'credit':
        return <CreditForm customerInfo={customerInfo}
        updateInfo={updateInfo} setCurrentPage={setCurrentPage}/>
        break;
      case 'summary':
        return <Summary customerInfo={customerInfo} retreiveCustomerInfo={retreiveCustomerInfo}/>
        break;
      default:
        return <Home setCurrentPage={setCurrentPage} />
        break;
    }
  }

  useEffect(() => {
    setSession()
      .then(() => {
        retreiveCustomerInfo();
      })
  }, [])

  return (
    <div>
      {getCurrentPage()}
    </div>
  )

}


export default App;