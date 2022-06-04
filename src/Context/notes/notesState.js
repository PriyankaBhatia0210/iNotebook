import { useState } from "react";
import noteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const allNotes = []
  const [notes, setNotes] = useState(allNotes)

  //Get all notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  //To add a new note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    setNotes(notes.concat(json))
  }

  //To delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      },
    });

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //To edit notes
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
      }
    }

    setNotes(newNotes);

  }

  return (
    <noteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;