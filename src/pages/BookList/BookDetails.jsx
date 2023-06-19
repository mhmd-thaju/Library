import React, { useEffect, useState } from 'react'
import { StdNavbar } from '../../components/Navbar/StdNavbar'
import "./Books.css"

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export const BookDetails = () => {

    const { isAdmin } = useUser()

    const { isbn } = useParams()
    const location = useLocation()

    const [book, setBook] = useState({})
    useEffect(() => {
        setBook(location.state[0])
    }, [])
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(location.state[1])
    }, [])
    // console.log(book)

    return (
        <div>
            <div>
                <StdNavbar />
            </div>
            <div className="detail-container">
                <div className="heading">
                    <Typography variant='h4' style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>Books Details</Typography>
                </div>
                <TableContainer component={Paper}  >
                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                        {/* <TableHead className='tablehead'> */}
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Name</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Author</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book.author}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Category</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book.category}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>ISBN</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book.isbn}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Copies</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book.copies}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Available</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book.available}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Price</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book.price}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>SI</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Name</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'></TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'></TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    to={isAdmin ? `/admin/users/${user.id}/books` : `/student/mybooks`}
                                    // onClick={() => navigate(`/books/${book.isbn}`)}
                                    style={{ background: "#2a9942" }}
                                    state={user}
                                >GO BACK</Button>
                            </TableCell>
                        </TableRow>
                        {/* </TableHead> */}
                        {/* <TableBody>
                            {
                                <TableRow
                                    key={book.isbn}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell style={{ fontSize: "20px" }} >{index + 1}</TableCell>
                                    <TableCell component="th" scope="row" style={{ fontSize: "20px" }}>
                                        {book.name}
                                    </TableCell>
                                    <TableCell style={{ fontSize: "20px" }} align="right">{book.author}</TableCell>
                                    <TableCell style={{ fontSize: "20px" }} align="right">{book.category}</TableCell>
                                    <TableCell style={{ fontSize: "20px" }} align="right">{book.isbn}</TableCell>
                                    <TableCell style={{ fontSize: "20px" }} align="right">{book.copies}</TableCell>
                                    <TableCell style={{ fontSize: "20px" }} align="right">{book.available}</TableCell>
                                    <TableCell style={{ fontSize: "26px" }} align="right">&#8377;{book.price}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            size="small"
                                            to={`/books/${book.isbn}`}
                                            // onClick={() => navigate(`/books/${book.isbn}`)}
                                            style={{ background: "#2a9942" }}
                                        >View</Button>
                                    </TableCell>
                                </TableRow>

                            }
                        </TableBody> */}
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
