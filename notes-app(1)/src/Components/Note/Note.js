import React from 'react';
import deleteIcon from '../../assets/delete-323.png';
import "./Note.css";

function Note(props) {
  const [selectedDate, setSelectedDate] = React.useState("");

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec",
    ];

    let hrs = date.getHours();
    let amPm = hrs > 12 ? "PM" : "AM";

    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const handleDateChange = (event) => {
    const selectedDateValue = event.target.value;
    setSelectedDate(selectedDateValue);

    const currentDate = new Date().toLocaleDateString();
    const selectedDate = new Date(selectedDateValue).toLocaleDateString();

    if (selectedDate <= currentDate) {
      props.onDeadlineReached(props.note.id);
    }
  };

  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      <textarea className='note_text' defaultValue={props.note.text} />
      <p>{formatDate(props.note.time)}</p>

      <div className="note_footer">
        <input className="date_picker" type="date" id="selectedDate" onChange={handleDateChange} />
        <img src={deleteIcon} alt="Delete" onClick={() => props.deleteNote(props.note.id)} />
      </div>
    </div>
  );
}

export default Note;
