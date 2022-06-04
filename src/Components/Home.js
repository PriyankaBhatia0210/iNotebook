import AddNote from './AddNote'
import NoteComponent from './NoteComponent'

export default function Home(props) {
    
    return (
        <>
        <AddNote showAlert={props.showAlert}/>
        <div className="container">
            <h5>Your Notes: </h5>
            <NoteComponent showAlert={props.showAlert}/>
        </div>
        </>
    )
}
