
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '../../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { MainNavbar } from '../../components/Navbar/MainNavbar'
import "./login.css"
import { useUser } from '../../contexts/UserContext';

export const StudentLogin = () => {

    const navigate = useNavigate();



    const { loginUser, logoutUser, user1, isAdmin } = useUser()

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")


    const studentLog = async () => {
        await loginUser(loginEmail, loginPassword)
        // console.log(user1)
        if (user1)
            navigate(isAdmin ? `/admin/home` : `/student/home`)
    }

    const studentSignout = () => {
        logoutUser()
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

                        <button type="submit" className="btn" onClick={studentLog}>Sign in</button>

                        <div className="login-register">
                            <p>New user? <Link to="/studentsignup">Sign Up</Link></p>
                        </div>
                    </form>
                </div>



                {user1 && user1.email}
                <p>logged in</p>

                <div className="signout">
                    <button onClick={studentSignout}> Sign Out</button>
                </div>
            </div>
        </div>
    )
}


