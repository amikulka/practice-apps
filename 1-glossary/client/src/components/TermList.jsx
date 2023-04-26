import React from 'react';
import TermListItem from './TermListItem.jsx';

function TermList({terms, editTerm, removeTerm}) {
  return (
    <div className='termList'>
      {terms.map(term => {
        return <TermListItem key={term['_id']} term={term} editTerm={editTerm} removeTerm={removeTerm} />;
      })}
    </div>
  );
}

export default TermList;