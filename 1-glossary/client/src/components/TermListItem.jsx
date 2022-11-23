import React from 'react';

function TermListItem ({term}) {

  return (
    <div>
      <div>{term.term}</div>
      <div>{term.definition}</div>
      <button>EDIT</button>
      <button>DELETE</button>
    </div>
  );
}


export default TermListItem;