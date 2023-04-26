import React from "react";
import axios from 'axios';
import { render } from "react-dom";

import AddTermForm from "./components/AddTermForm.jsx";
import TermList from "./components/TermList.jsx";

const{useState, useEffect} = React;

function App() {
  const [terms, setTerms] = useState([{
    term: 'term1',
    definition:'definition 1'
  },
  {
    term: 'term2',
    definition: 'definition 2'
  }]);

  function addTerm(term, definition) {
    axios.post('/terms', {term, definition})
    .then(() => {
      retrieveTerms();
    })
    .catch(err => {
      console.long(err);
    });
  }

  function retrieveTerms() {
    //GET
    axios.get('/terms')
      .then(results => {
        setTerms(results.data.reverse());
      })
      .catch(err => {
        console.log(err)
      });
  }

  function editTerm(_id, newTerm, newDefinition) {

    axios.put('/terms', {_id, newTerm, newDefinition})
      .then(() => {
        retrieveTerms();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function removeTerm(term) {
    //DELETE
    let {_id} = term;
    axios.delete('/terms', {data: {_id}})
      .then(() => {
        retrieveTerms();
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    retrieveTerms();
  }, []);

  return (
    <div className='appDiv'>
      <header>Terminology</header>
      <AddTermForm addTerm={addTerm} />
      <TermList terms={terms} editTerm={editTerm} removeTerm={removeTerm} />
    </div>
  )
}


render(<App />, document.getElementById('root'));