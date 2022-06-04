import React, { useContext } from 'react'
import noteContext from "../Context/notes/notesContext"

const NoteItem = (props) => {
    //NoteItem.js will take updateNote as props and call this function with parameter noteItem = currentNote
    let { noteItem, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const deleteNotes = ()=> {
        deleteNote(noteItem._id)
        props.showAlert("Note Deleted", "Success")
    }
    return (
        <div className="my-3">
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }
                }>
                    <span className="badge rounded-pill bg-danger"> {noteItem.tag} </span>
                </div>

                <div className="card-body">
                    <h5 className="card-title">{noteItem.title}  </h5>
                    <p className="card-text">{noteItem.description}</p>
                    <p className="card-text"><small className="text-muted">By {noteItem.user} created on  {noteItem.date}</small></p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={deleteNotes}></i>
                    <i className="fa-solid fa-file-pen mx-2" onClick={() => { updateNote(noteItem) }}></i>
                </div>
            </div>
        </div>
    )

}

export default NoteItem