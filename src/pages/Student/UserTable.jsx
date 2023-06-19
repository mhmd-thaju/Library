import React from 'react'
import { useUser } from '../../contexts/UserContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, TablePagination, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { StdNavbar } from '../../components/Navbar/StdNavbar';

export const UserTable = () => {

    const { userList } = useUser()
    // console.log(userList)

    const [rowPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)


    return (
        <div>
            <StdNavbar />
            <div>
                <div className="heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant='h4' style={{ textAlign: "center", marginLeft: "60px", marginBottom: "40px", marginTop: "40px" }}>User Lists</Typography>

                    {/* <Typography style={{ textAlign: "center", marginRight: "60px", marginBottom: "40px", marginTop: "40px" }}>
                        <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            to={`/admin/users/adduser`}
                            style={{ background: "#2a9942" }}
                        >Add User</Button>

                    </Typography> */}
                </div>

                {userList.length > 0 ? (
                    <>
                        <div className='table'>
                            <TableContainer component={Paper}  >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead className='tablehead'>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "26px" }}>SI</TableCell>
                                            <TableCell style={{ fontSize: "26px" }}>Name</TableCell>
                                            <TableCell style={{ fontSize: "26px" }} align="left">Email</TableCell>
                                            <TableCell style={{ fontSize: "26px" }} align="left">Library-ID</TableCell>
                                            <TableCell style={{ fontSize: "26px" }} align="left">Phone</TableCell>
                                            <TableCell style={{ fontSize: "26px" }} align="left">College</TableCell>
                                            <TableCell style={{ fontSize: "26px" }} ></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowPerPage > 0
                                            ? userList.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                            : userList
                                        ).map((user, index) => (
                                            user.role !== 'admin' && <>
                                                <TableRow
                                                    key={user.isbn}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell style={{ fontSize: "20px" }} >{index + 1}</TableCell>
                                                    <TableCell component="th" scope="row" align='left' style={{ fontSize: "20px" }}>
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "20px" }} align="left">{user.email}</TableCell>
                                                    <TableCell style={{ fontSize: "20px" }} align="left">{user.lid}</TableCell>
                                                    <TableCell style={{ fontSize: "20px" }} align="left">{user.phone}</TableCell>
                                                    <TableCell style={{ fontSize: "20px" }} align="left">{user.college}</TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            to={`/admin/users/${user.id}/profile`}
                                                            // onClick={() => navigate(`/books/${book.isbn}`)}
                                                            style={{ background: "#2a9942", marginLeft: "5px" }}
                                                            state={user}
                                                        >Profile</Button>

                                                        <Button
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            to={`/admin/users/${user.id}/books`}
                                                            // onClick={() => navigate(`/books/${book.isbn}`)}
                                                            style={{ background: "#2a9942", marginLeft: "5px" }}
                                                            state={user}
                                                        >Books</Button>
                                                        <Button
                                                            variant="contained"
                                                            component={Link}
                                                            size="small"
                                                            // to={`/student/books/${user.isbn}/details`}
                                                            // onClick={() => navigate(`/books/${book.isbn}`)}
                                                            style={{ background: "red", marginLeft: "5px" }}
                                                            state={user}
                                                        >Remove</Button>
                                                    </TableCell>
                                                </TableRow>

                                            </>
                                        ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                onRowsPerPageChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10))
                                    setPage(0)
                                }}
                                component="div"
                                count={userList.length}
                                rowsPerPage={rowPerPage}
                                page={page}
                                onPageChange={(e, newPage) => setPage(newPage)}
                            />
                        </div>


                    </>
                ) : (
                    <Typography variant='h4'> No Books found!</Typography>
                )
                }
            </div>
        </div>
    )
}