import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, TablePagination, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import "./Books.css"
import { doc } from '@firebase/firestore'


export const BooksTable = () => {


    const { user, isAdmin } = useUser()
    const [booksList, setBooksList] = useState([{}])

    const bookListCollectionRef = collection(db, "BooksList")

    const [rowPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)

    const getBookList = async () => {
        const data = await getDocs(bookListCollectionRef);
        //console.log(data.docs)
        setBooksList(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })))
    }

    const deleteBook = async (id) => {
        const doDoc = doc(db, "BooksList", id)
        await deleteDoc(doDoc)
    }

    useEffect(() => {
        getBookList()
    }, [deleteBook])
    // console.log(booksList)





    return (
        <>
            <div className="heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant='h4' style={{ textAlign: "center", marginLeft: "60px", marginBottom: "40px", marginTop: "40px" }}>Books Lists</Typography>
                {isAdmin ? (
                    <Typography style={{ textAlign: "center", marginRight: "60px", marginBottom: "40px", marginTop: "40px" }}>
                        <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            to={`/admin/books/addbook`}
                            style={{ background: "#2a9942" }}
                        >Add Book</Button>

                    </Typography>
                ) : ("")}
            </div>

            {booksList.length > 0 ? (
                <>
                    <div className='table'>
                        <TableContainer component={Paper}  >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='tablehead'>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "26px" }}>SI</TableCell>
                                        <TableCell style={{ fontSize: "26px" }}>Name</TableCell>
                                        <TableCell style={{ fontSize: "26px" }} align="right">Author</TableCell>
                                        <TableCell style={{ fontSize: "26px" }} align="right">Category</TableCell>
                                        <TableCell style={{ fontSize: "26px" }} align="right">ISBN</TableCell>
                                        <TableCell style={{ fontSize: "26px" }} align="right">Copies</TableCell>
                                        <TableCell style={{ fontSize: "26px" }} align="right">Available</TableCell>
                                        <TableCell style={{ fontSize: "26px" }} align="right">Price</TableCell>
                                        <TableCell style={{ fontSize: "26px" }} ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowPerPage > 0
                                        ? booksList.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                        : booksList
                                    ).map((book, index) => (
                                        <TableRow
                                            key={book?.isbn}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell style={{ fontSize: "20px" }} >{index + 1}</TableCell>
                                            <TableCell component="th" scope="row" style={{ fontSize: "20px" }}>
                                                {book?.name}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "20px" }} align="right">{book?.author}</TableCell>
                                            <TableCell style={{ fontSize: "20px" }} align="right">{book?.category}</TableCell>
                                            <TableCell style={{ fontSize: "20px" }} align="right">{book?.isbn}</TableCell>
                                            <TableCell style={{ fontSize: "20px" }} align="right">{book?.copies}</TableCell>
                                            <TableCell style={{ fontSize: "20px" }} align="right">{book?.available}</TableCell>
                                            <TableCell style={{ fontSize: "26px" }} align="right">&#8377;{book?.price}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    component={Link}
                                                    size="small"
                                                    to={isAdmin ? `/admin/books/${book?.isbn}/details` : `/student/books/${book?.isbn}/details`}
                                                    // onClick={() => navigate(`/books/${book.isbn}`)}
                                                    style={{ background: "#2a9942", marginLeft: "5px" }}
                                                    state={book}
                                                >View</Button>
                                                {isAdmin && <>
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        to={`/admin/books/${book?.isbn}/details/updatebook`}
                                                        // onClick={() => navigate(`/books/${book.isbn}`)}
                                                        style={{ background: "#2a9942", marginLeft: "5px" }}
                                                        state={book}
                                                    >Update</Button>
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        onClick={() => deleteBook(book?.id)}
                                                        style={{ background: "red", marginLeft: "5px" }}
                                                        state={book}
                                                    >Delete</Button>
                                                </>}
                                            </TableCell>
                                        </TableRow>
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
                            count={booksList.length}
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
        </>
    );
}
