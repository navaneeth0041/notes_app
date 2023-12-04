import React, { useState, useEffect } from 'react';
import plusIcon from '../../assets/plus.png';
import './Sidebar.css';

function Sidebar(props) {
  const colors = ["#fe9b72", "#fec971", "#00d4fe", "#b693fd", "#e4ee91"];
  const [listOpen, setListOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [editing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    id: '',
    text: "",
    time: Date.now(),
    color: selectedColor,
  });

  useEffect(() => {
    if (editing) {
      setEditedNote({
        ...editedNote,
        color: selectedColor,
        text: props.selectedNote.text,
      });
    }
  }, [editing, selectedColor, props.selectedNote]);

  const addOrUpdateNote = () => {
    if (editing) {
      fetch(`http://localhost:8000/api/notes/${editedNote.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedNote),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Note updated successfully:', data);
          props.onNoteUpdated(data);
        })
        .catch(error => console.error('Error updating note:', error));
    } else {
      fetch('http://localhost:8000/api/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedNote,
          id: Date.now() + '' + Math.floor(Math.random() * 69),
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Note added successfully:', data);
          props.onNoteAdded(data);
        })
        .catch(error => console.error('Error adding note:', error));
    }

    
    setListOpen(false);
    setEditing(false);
    setEditedNote({
      id: '',
      text: "",
      time: Date.now(),
      color: selectedColor,
    });
  };

  return (
    <div className='sidebar'>
      <img src={plusIcon} alt="Add" onClick={() => setListOpen(!listOpen)} />
      {listOpen && (
        <div className="color-dropdown">
          <label>Select Color:</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {colors.map((color, index) => (
              <option key={index} value={color} style={{ backgroundColor: color }} />
            ))}
          </select>
          <textarea
            placeholder="Enter your note..."
            value={editedNote.text}
            onChange={(e) => setEditedNote({ ...editedNote, text: e.target.value })}
          />
          {/* Display the blank or edited note component */}
          <div className="note" style={{ backgroundColor: selectedColor }}>
            <textarea className='note_text' defaultValue={editedNote.text} />
            <p>{new Date(editedNote.time).toLocaleDateString()}</p>
          </div>
          <button onClick={addOrUpdateNote}>{editing ? 'Update Note' : 'Add Note'}</button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
