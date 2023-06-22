import React from 'react'
import { useState, useEffect } from 'react'
import { StdNavbar } from '../../components/Navbar/StdNavbar'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useParams, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { updateDoc } from '@firebase/firestore'
import { doc } from '@firebase/firestore'
import { db } from '../../firebase/config'

export const UpdateUser = () => {
    const navigate = useNavigate()


    const { isAdmin, userList } = useUser()

    const location = useLocation()
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(location.state)
    }, [])
    // console.log(user)

    // const [name, setName] = useState("")
    // const [phone, setPhone] = useState("")
    const [newcollege, setNewCollege] = useState("")
    const [newcourse, setNewCourse] = useState("")
    const [newstream, setNewStream] = useState("")
    const [newyear, setNewYear] = useState("")


    const getCurrUser = () => {
        userList.map((each, index) => {
            if (each && user && each.id === user.id)
                return setUser(each)
            else
                return null
        })
    }
    useEffect(() => {
        getCurrUser()
    }, [])



    const updateProfile = async (id, e) => {

        const doDoc = doc(db, "Users", id)
        const change = {
            stream: newstream.length > 0 ? newstream : user?.stream,
            course: newcourse.length > 0 ? newcourse : user?.course,
            college: newcollege.length > 0 ? newcollege : user?.college,
            year: newyear.length > 0 ? newyear : user?.year
        }
        await updateDoc(doDoc, change)
        navigate(isAdmin ? `/admin/users/${user?.lid}/profile` : `/student/${user?.lid}/profile`, { state: user })
        window.location.reload(false);
    }



    return (
        <div>

            <div>
                <StdNavbar />
            </div>

            <div className="detailcontainer">
                <div className="heading">
                    <Typography variant='h4' style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>{user?.name}</Typography>
                </div>
                <div className='form'>
                    <form action="#">
                        <div>
                            <div className="flex">
                                <div className="inputbox">
                                    <label>Name</label>
                                    <input type="text" required value={user?.name} />
                                </div>
                                <div className="inputbox">
                                    <label>Phone</label>
                                    <input type="number" required value={user?.phone} />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="inputbox">
                                    <label>College</label>
                                    <input type="text" required onChange={(e) => { setNewCollege(e.target.value) }} defaultValue={user?.college} />
                                </div>

                                <div className="inputbox">
                                    <label>Course</label>
                                    <input type="text" required onChange={(e) => { setNewCourse(e.target.value) }} defaultValue={user?.course} />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="inputbox">
                                    <label>Stream</label>
                                    <input type="text" required onChange={(e) => { setNewStream(e.target.value) }} defaultValue={user?.stream} />
                                </div>

                                <div className="inputbox">
                                    <label>Admission Year</label>
                                    <input type="number" required onChange={(e) => { setNewYear(e.target.value) }} defaultValue={user?.year} />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="inputbox">
                                    <label>Library-ID</label>
                                    <input type="text" required value={user?.lid} />
                                </div>
                                <div className="inputbox">
                                    <label>email</label>
                                    <input type="email" required value={user?.email} />
                                </div>
                            </div>

                        </div>

                    </form>
                    <div>
                        <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            // to={`/admin/home/`}
                            onClick={() => updateProfile(user?.id)}
                            style={{ background: "#2a9942", marginLeft: "5px", marginBottom: "20px", width: "100px", fontSize: "16px" }}
                        >UPDATE </Button>
                        <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            // to={isAdmin ? `/admin/users/${user?.lid}/profile` : `/student/${user?.lid}/profile`}
                            onClick={() => navigate(-1)}
                            style={{ background: "#2a9942", marginLeft: "5px", marginBottom: "20px", width: "100px", fontSize: "16px" }}
                            state={user}
                        >CANCEL</Button>
                    </div>

                </div>

            </div>

        </div>
    )
}
