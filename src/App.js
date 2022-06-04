import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import React, {useState} from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './Context/notes/notesState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000)
}

  return ( 
    <>
    <NoteState> 
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
        <Route exact path="/iNotebook/home" element = {<Home showAlert={showAlert}/>} />   
        <Route exact path="/iNotebook/login" element = {<Login showAlert={showAlert}/>} />    
        <Route exact path="/iNotebook/signup" element = {<Signup showAlert={showAlert}/>} />                       
      </Routes>
    </div>
    </Router> 
    </NoteState>  
    </>

  );
}

export default App;
