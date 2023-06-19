import React, { useEffect, useState } from 'react'
import { StdNavbar } from '../../components/Navbar/StdNavbar'

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export const UserProfile = () => {
    const navigate = useNavigate()

    const { isAdmin } = useUser()

    const { isbn } = useParams()
    const location = useLocation()

    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(location.state)
    }, [])




    return (
        <div>
            <div>
                <StdNavbar />
            </div>
            <div className="detail-container">
                <div className="heading">
                    <Typography variant='h4' style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>{user?.name}</Typography>
                </div>
                <TableContainer component={Paper}  >
                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                        {/* <TableHead className='tablehead'> */}
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Name</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{user?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Email</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{user?.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Phone</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{user?.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Library-ID</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{user?.lid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Stream</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{user?.stream}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Course</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{user?.course}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Year</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{user?.year}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>College</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{user?.college}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>
                                {isAdmin && (
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        size="small"
                                        to={`/admin/users/${user?.lid}/profile/update`}
                                        // onClick={() => navigate(`/books/${book.isbn}`)}
                                        style={{ background: "#2a9942" }}
                                        state={user}
                                    >EDIT</Button>
                                )}
                            </TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'></TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    onClick={() => navigate(-1)}
                                    style={{ background: "#2a9942" }}
                                >GO BACK</Button>
                            </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
