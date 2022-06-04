import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/notes/notesContext'
import NoteItem from './NoteItem'

export default function NoteComponent(props) {
  let history = useNavigate()
  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context;

  //Create new updatedNote when edit currentNote
  const [updatedNote, setUpdatedNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  
  //Use refClose to close modal
  const refClose = useRef(null)
  //Use ref to open modal
  const ref = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line
    if(localStorage.getItem("auth-token")){
      getNotes()
    }else{
      history("/iNotebook/login")
    }
    
    
  }, [])


  //Update updatedNote with currentItem first
  const updateNote = (noteItem) => {
    ref.current.click();
    setUpdatedNote({ id: noteItem._id, etitle: noteItem.title, edescription: noteItem.description, etag: noteItem.tag })

  }

  //Then when clicked save - call editNote api to edit the note
  const handleClick = (e) => {
    editNote(updatedNote.id, updatedNote.etitle, updatedNote.edescription, updatedNote.etag)
    props.showAlert("Note Updated", "Success")
    refClose.current.click();
  }

  //When onChange then update the newNote with those fields
  const onChange = (e) => {
    setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value })
  }

  return (
    <>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={updatedNote.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={updatedNote.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={updatedNote.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">

              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button disabled = {updatedNote.etitle.length < 5 || updatedNote.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>



      <div className="container" >
        <div className="row my-1" >
          <div className="container">
            {notes.length === 0 && "No Notes to display"}
          </div>
          {notes.map((element) => {
            return <div className="col-md-3" key={element._id}>
              <NoteItem noteItem={element} updateNote={updateNote} showAlert={props.showAlert}/>
            </div>
          })}
        </div>
      </div>
    </>
  )
}
