import React from 'react'
import "./MainNavbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserGear, faBook } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export const MainNavbar = () => {
    return (
        <div className='navbar'>
            <div className="logo">

                <h1> <FontAwesomeIcon icon={faBook} /> LIBRARY MANAGEMENT SYSTEM</h1>
            </div>

            <div className="login-links">
                <div className="link">

                    <Link to='/studentlogin' style={{ textDecoration: "none" }}><h2>  <FontAwesomeIcon icon={faUser} /> Student</h2></Link>
                </div>
                <div className="link">
                    <Link to="/adminlogin" style={{ textDecoration: "none" }}><h2> <FontAwesomeIcon icon={faUserGear} /> Admin</h2></Link>
                </div>
            </div>
        </div>
    )
}

export default MainNavbar
