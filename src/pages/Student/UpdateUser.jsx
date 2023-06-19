import React from 'react'
import { useState, useEffect } from 'react'
import { StdNavbar } from '../../components/Navbar/StdNavbar'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useParams, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

export const UpdateUser = () => {
    const navigate = useNavigate()

    const { isAdmin } = useUser()

    const location = useLocation()
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(location.state)
    }, [])
    // console.log(user)

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [college, setCollege] = useState("")
    const [course, setCourse] = useState("")
    const [stream, setStream] = useState("")
    const [year, setYear] = useState("")

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
                                    <input type="text" required onChange={(e) => { setName(e.target.value) }} defaultValue={user?.name} />
                                </div>
                                <div className="inputbox">
                                    <label>Phone</label>
                                    <input type="number" required onChange={(e) => { setPhone(e.target.value) }} defaultValue={user?.phone} />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="inputbox">
                                    <label>College</label>
                                    <input type="text" required onChange={(e) => { setCollege(e.target.value) }} defaultValue={user?.college} />
                                </div>

                                <div className="inputbox">
                                    <label>Course</label>
                                    <input type="text" required onChange={(e) => { setCourse(e.target.value) }} defaultValue={user?.course} />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="inputbox">
                                    <label>Stream</label>
                                    <input type="text" required onChange={(e) => { setStream(e.target.value) }} defaultValue={user?.stream} />
                                </div>

                                <div className="inputbox">
                                    <label>Admission Year</label>
                                    <input type="number" required onChange={(e) => { setYear(e.target.value) }} defaultValue={user?.year} />
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
                            // onClick={() => navigate(`/books/${book.isbn}`)}
                            style={{ background: "#2a9942", marginLeft: "5px", marginBottom: "20px", width: "100px", fontSize: "16px" }}
                        >UPDATE </Button>
                        <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            to={isAdmin ? `/admin/users/${user?.id}/profile` : `/student/${user?.id}/profile`}
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
