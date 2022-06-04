import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function Navbar(props) {
    let history = useNavigate();
    const handleLogout = ()=> {
        localStorage.removeItem("auth-token")
        history("/iNotebook/login")
    }
    const location = useLocation();
    useEffect(()=> {
        console.log(location.pathname);
    }, [location])
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/iNotebook/home'}?"active":""`} aria-current="page" to="/iNotebook/home">Home</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("auth-token")?<form>
                        <Link className="btn btn-primary mx-2" to="iNotebook/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="iNotebook/signup" role="button">Signup</Link>
                        </form>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

