import React from 'react';
import Note from '../Note/Note';
import './NoteContainer.css';

function NoteContainer(props) {
  return (
    <div className='note-container'>
      <h1> Notes </h1>
      <div className='note-container_notes custom-scroll'>
        {props.notes.length===0 ? (
          <h2> No Notes yet.........</h2>
        ) : (
          props.notes.map((item) => (
            <Note key={item.id} note={item}
            deleteNote={props.deleteNote}
            onDeadlineReached={props.onDeadlineReached}
            
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NoteContainer;

