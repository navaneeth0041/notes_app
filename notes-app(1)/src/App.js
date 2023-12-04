import React, { useState, useEffect } from 'react';
import NoteContainer from './Components/NoteContainer/NoteContainer';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/notes/')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addNote = (newNote) => {
    const tempNotes = [...notes];
    tempNotes.push(newNote);
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex(item => item.id === id);
    if (index < 0) return;

    const deletedNote = tempNotes.splice(index, 1)[0];
    setNotes(tempNotes);
    fetch(`http://localhost:8000/api/notes/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Note deleted successfully');
        } else {
          console.error('Error deleting note:', response.status);
        }
      })
      .catch(error => console.error('Error deleting note:', error));
  };

  const onDeadlineReached = (noteId) => {
    const tempNotes = notes.map((note) => {
      if (note.id === noteId) {
        const currentDate = new Date().toLocaleDateString();
        const selectedDate = new Date(note.time).toLocaleDateString();
        if (selectedDate === currentDate) {
          return { ...note, color: 'red' };
        }
      }
      return note;
    });
    setNotes(tempNotes);
  };
  
  return (
    <div className="App">
      <Sidebar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        onDeadlineReached={onDeadlineReached}
      />
    </div>
  );
}

export default App;
