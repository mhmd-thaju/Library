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
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const AllBookDetails = () => {

    const navigate = useNavigate()
    const { isbn } = useParams()
    const location = useLocation()
    const { isAdmin, user } = useUser()

    const [book, setBook] = useState({})
    useEffect(() => {
        setBook(location.state)
    }, [])
    // console.log(book)


    const BorrowBook = async (isbn, id) => {
        // console.log(id)
        const doDocUser = doc(db, "Users", id)
        const change = { issued: [...issuedBooks, isbn] }

        const doDocBook = doc(db, "BooksList", book.id)
        const availableChange = { available: available - 1 }

        await updateDoc(doDocBook, availableChange)
        await updateDoc(doDocUser, change)

        navigate(`/student/books/${book?.isbn}/details`, { state: book })
    }

    const ReturnBook = async (isbn, id) => {
        const doDocUser = doc(db, "Users", id)
        const index = issuedBooks.indexOf(isbn)
        const change = { issued: [...issuedBooks.slice(0, index), ...issuedBooks.slice(index + 1)] }

        const doDocBook = doc(db, "BooksList", book.id)
        const availableChange = { available: available + 1 }

        await updateDoc(doDocBook, availableChange)
        await updateDoc(doDocUser, change)
        navigate(`/student/books/${book?.isbn}/details`, { state: book })
    }

    const [issuedBooks, setIssuedBooks] = useState([])
    useEffect(() => {
        setIssuedBooks(user.issued)
    }, [user, issuedBooks])
    // console.log(issuedBooks)

    const [available, setAvailable] = useState(0)
    useEffect(() => {
        setAvailable(book.available)
    }, [book, issuedBooks])

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
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Author</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book?.author}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Category</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book?.category}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>ISBN</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book?.isbn}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Copies</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book?.copies}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Available</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book?.available}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>Price</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='left'>---</TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>{book?.price}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: "26px" }} align='center'>
                                {isAdmin ? (
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        size="small"
                                        to={`/admin/books/${book?.isbn}/details/updatebook`}
                                        style={{ background: "#2a9942", marginRight: "10px" }}
                                        state={book}
                                    >EDIT</Button>
                                ) : (
                                    user.issued && user.issued.includes(book?.isbn) ? (
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            size="small"
                                            onClick={() => ReturnBook(book?.isbn, user?.id)}
                                            // to={`/student/books/${book.isbn}/request`}
                                            style={{ background: "#2a9942", marginRight: "10px" }}
                                        >RETURN</Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            size="small"
                                            onClick={() => BorrowBook(book?.isbn, user?.id)}
                                            // to={`/student/books/${book.isbn}/request`}
                                            style={{ background: "#2a9942", marginRight: "10px" }}
                                        >BORROW</Button>
                                    )
                                )}
                            </TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'></TableCell>
                            <TableCell style={{ fontSize: "26px" }} align='center'>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    size="small"
                                    // to={`/student/home`}
                                    onClick={() => {
                                        navigate(-1)
                                    }}
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
