import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { MainNavbar } from '../../components/Navbar/MainNavbar'

export const Main = () => {
    return (

        <div>
            <MainNavbar />
            <div className='main-container'>
                <div className="name">
                    <h1><FontAwesomeIcon icon={faBook} /></h1>
                    <h1>BIBLIOTHECA DIGITAL LIBRARY</h1>
                </div>
                <div className="signin">
                    <h2>Click to view Books List</h2>
                    {/* <button type='submit'>Sign In</button> */}
                    <h2><Link to='/bookslist'><FontAwesomeIcon icon={faBookOpen} /></Link></h2>
                </div>
                <div className="footer">
                    <h2>LIBRARY MANAGEMENT SYSTEM</h2>
                </div>
            </div>
        </div>
    )
}

