import React from 'react';
const {useState} = React;

function TermListItem ({term, editTerm, removeTerm}) {
  const [isEditable, setIsEditable] = useState(false);
  const [newTerm, setNewTerm] = useState(term.term);
  const [newDefinition, setNewDefinition] = useState(term.definition)

  function handleEdit(e) {
    e.preventDefault();
    setIsEditable(!isEditable)
  }

  function handleDelete(e) {
    e.preventDefault();
    removeTerm(term);
  }

  function handleTermChange (e) {
    setNewTerm(e.target.value);
  }
  function handleDefChange (e) {
    setNewDefinition(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (newTerm === '' || newDefinition === '') return;
    editTerm(term['_id'], newTerm, newDefinition);
    setIsEditable(!isEditable);
  }

  if (isEditable) {
    return (
      <form className='editForm'>
        <input className='editTermText' type='text' onChange={handleTermChange} value={newTerm}></input>
        <textarea className='editDefText' type='text' onChange={handleDefChange} value={newDefinition}></textarea>
        <button className='editButton' type='submit' onClick={handleSubmit}>Update</button>
      </form>
    )
  } else {
    return (
      <div className='termListItem'>
        <div className='term'>{term.term}</div>
        <div className='definition'>{term.definition}</div>
        <button className='editButton' onClick={handleEdit}>Edit</button>
        <button className='deleteButton' onClick={handleDelete}>Delete</button>
      </div>
    );
  }
}


export default TermListItem;