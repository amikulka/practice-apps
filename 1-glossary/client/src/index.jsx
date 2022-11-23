import React from "react";
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
    //POST
  }

  function retrieveTerms() {
    //GET
  }

  function editTerm(term, newDefinition) {
    //PUT
  }

  function removeTerm(term) {
    //DELETE
  }



  return (
    <div>
      <header>My Glossary</header>
      <AddTermForm />
      <TermList terms={terms} />
    </div>
  )
}


render(<App />, document.getElementById('root'));