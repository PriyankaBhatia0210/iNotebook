import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
const [credentials, setCredentials] = useState({email:"", password:""})
let history = useNavigate();

const handleSumbit = async (e)=> {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         },
        body: JSON.stringify({email:credentials.email, password: credentials.password })
      });

      const json = await (response.json())
      if(json.success === true){
        localStorage.setItem('auth-token',json.authToken)
        history("/iNotebook/home")
        props.showAlert("Login Successful!", "Success")
      }else{
          props.showAlert("Invalid Credentials", "Danger")
      }
      
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})

}
  return (
<div className="container my-2">
  <h3>Login to use iNotebook</h3>
    <form onSubmit={handleSumbit}>
  <div className="form-group my-4">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
  </div>
  <div className="form-group my-4">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Login
