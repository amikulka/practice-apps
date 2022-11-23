import React from 'react';
import TermListItem from './TermListItem.jsx';

function TermList({terms}) {
 console.log(terms);
  return (
    <div>
      <div>
      {terms.map(term => {
        return <TermListItem key={term._id} term={term} />;
      })}
      </div>
    </div>
  );
}

export default TermList;