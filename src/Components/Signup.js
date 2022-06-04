import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
const [credentials, setCredentials] = useState({name: "", email:"", password:""})
let history = useNavigate();

const handleSumbit = async (e)=> {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         },
        body: JSON.stringify({name: credentials.name, email:credentials.email, password: credentials.password })
      });

      const json = await (response.json())
      if(json.success === true){
        localStorage.setItem('auth-token',json.authToken)
        history("/iNotebook/home")
        props.showAlert("Account Created", "Success")
      }else{
        props.showAlert(json.message, "Danger")
      }
      
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})

}
  return (
<div className="container my-2">
  <h3>Create an account to use iNotebook</h3>
    <form onSubmit={handleSumbit}>
    <div className="form-group my-4">
    <label htmlFor="exampleInputEmail1">Enter your Name</label>
    <input type="name" className="form-control" id="name" name="name" value={credentials.name} aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange}/>
  </div>
  <div className="form-group my-4">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
  </div>
  <div className="form-group my-4">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary">SignUp</button>
</form>
</div>
  )
}

export default Signup
