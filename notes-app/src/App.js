import React, { useState } from 'react';



import NoteContainer from './Components/NoteContainer/NoteContainer';

import './App.css';

import Sidebar from './Components/Sidebar/Sidebar';

function App() {

  const [notes,setNotes]=useState([
  ]);

  const addNote=(color)=>{
    const tempNotes=[...notes];
    tempNotes.push({
      id:Date.now()+""+Math.floor(Math.random()*69),
      text:"",
      time:Date.now(),
      color,
    });
    setNotes(tempNotes);

  };

  const deleteNote=(id)=> {
    const tempNotes=[...notes]
    const index =tempNotes.findIndex(item=>item.id===id)
    if(index<0)return


    tempNotes.splice(index,1);
    setNotes(tempNotes);
  };
  const onDeadlineReached=(noteId)=>{
    const tempNotes=notes.map((note)=>{
      if (note.id===noteId){
    const currentDate = new Date().toLocaleDateString();
    const selectedDate = new Date(note.time).toLocaleDateString();
        if (selectedDate===currentDate){
          return{...note,color:'red'};
        }
      }
      return note;
    });
    setNotes(tempNotes);
  };



  return (
    <div className="App">
      <Sidebar addNote={addNote}/>
      <NoteContainer notes={notes}
      deleteNote={deleteNote}
      onDeadlineReached={onDeadlineReached}
      
      />
    </div>
  );
}

export default App;
