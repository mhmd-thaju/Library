import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons'
import { MainNavbar } from '../../components/Navbar/MainNavbar'
import { collection, addDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';
import "./login.css"

export const StudentSignup = () => {

    const [regEmail, setRegEmail] = useState("")
    const [regPassword, setRegPassword] = useState("")
    const [regUsername, setRegUsername] = useState("")
    const [regPhone, setRegPhone] = useState(0)
    const [lid, setLid] = useState(0)

    const userCollectionRef = collection(db, "Users")

    const [userList, setUserList] = useState([{}])


    const createUser = async () => {
        await addDoc(userCollectionRef, { name: regUsername, phone: regPhone, email: regEmail, lid: lid })
        setUserList([...userList, { name: regUsername, phone: regPhone, email: regEmail, lid: lid }])
    }


    const [user, setUser] = useState({})


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                setUser(null)
            }
        })
    }, [])

    const navigate = useNavigate()



    const studentReg = async () => {
        try {
            const user1 = await createUserWithEmailAndPassword(auth, regEmail, regPassword)
            // console.log(user1.user)
            await updateProfile(user1.user, {
                displayName: regUsername,
                phoneNumber: regPhone,
            })
            // console.log(user1.user)
            setLid(Math.floor(Math.random() * 90000) + 10000)
            setLid(Math.floor(Math.random() * 90000) + 10000)
            createUser()
            navigate(`/student/home`)
        } catch (error) {
            console.log(error.message)
        }
    }


    const studentSignout = async () => {
        await signOut(auth)
    }


    return (
        <div>
            <MainNavbar />
            <div className="logreg-box">

                <div className="form-box register ">
                    <form action="#">
                        <h2>Sign Up</h2>
                        <div className="input-box">
                            <span className="icon"><i className='bx bx-user'><FontAwesomeIcon icon={faUser} /></i></span>
                            <input type="text" required onChange={(e) => { setRegUsername(e.target.value) }} />
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><i className='bx bx-user'><FontAwesomeIcon icon={faPhone} /></i></span>
                            <input type="number" required onChange={(e) => { setRegPhone(e.target.value) }} />
                            <label>Phone</label>
                        </div>

                        <div className="input-box">
                            <span className="icon"><i className='bx bxl-gmail'><FontAwesomeIcon icon={faEnvelope} /></i></span>
                            <input type="text" required onChange={(e) => { setRegEmail(e.target.value) }} />
                            <label>Email</label>
                        </div>

                        <div className="input-box">
                            <span className="icon"><i className='bx bxs-lock-alt' ><FontAwesomeIcon icon={faLock} /></i></span>
                            <input type="password" required onChange={(e) => { setRegPassword(e.target.value) }} />
                            <label>Password</label>
                        </div>

                        <div className="remember-forgot">
                            <label><input type="checkbox" required />I agree to the terms and conditions</label>
                        </div>

                        <button type="submit" className="btn" onClick={studentReg}>Sign up</button>

                        <div className="login-register">
                            <p>Already have an account? <Link to="/studentlogin">Sign In</Link></p>
                        </div>
                    </form>
                </div>

                {user && user.email}
                <p>logged in</p>

                <div className="signout">
                    <button onClick={studentSignout}> Sign Out</button>
                </div>
            </div>
        </div>
    )
}


