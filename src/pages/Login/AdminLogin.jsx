import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { MainNavbar } from '../../components/Navbar/MainNavbar'
import "./login.css"

export const AdminLogin = () => {

    // {
    //     const logregBox = document.querySelector('.logreg-box');
    //     const loginLink = document.querySelector('.login-link');
    //     const registerLink = document.querySelector('.register-link');

    //     registerLink.addEventListener('click', () => {
    //         logregBox.classNameList.add('active');
    //     });

    //     loginLink.addEventListener('click', () => {
    //         logregBox.classNameList.remove('active');
    //     });
    // }


    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")


    const [user, setUser] = useState({})


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                setUser({})
            }
        })
    }, [])


    const adminLog = async () => {
        try {
            const user1 = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user1)
        } catch (error) {
            console.log(error.message)
        }
    }

    const adminSignout = async () => {
        await signOut(auth)
    }


    return (

        <div>
            <MainNavbar />
            <div className="logreg-box">
                <div className="form-box login ">
                    <form action="#">
                        <h2>Sign In</h2>
                        <div className="input-box">
                            <span className="icon"><i className='bx bxl-gmail'><FontAwesomeIcon icon={faEnvelope} /></i></span>
                            <input type="email" required onChange={(e) => { setLoginEmail(e.target.value) }} />
                            <label>Email</label>
                        </div>

                        <div className="input-box">
                            <span className="icon"><i className='bx bxs-lock-alt' ><FontAwesomeIcon icon={faLock} /></i></span>
                            <input type="password" required onChange={(e) => { setLoginPassword(e.target.value) }} />
                            <label>Password</label>
                        </div>

                        <div className="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                            <Link to="/"> Forgot Password?</Link>
                        </div>

                        <button type="submit" className="btn" onClick={adminLog} style={{ marginBottom: "40px" }}>Sign in</button>

                    </form>
                </div>


            </div>
        </div>
    )
}


