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
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import "../BookList/Books.css"
import { StdNavbar } from '../../components/Navbar/StdNavbar';
import { useUser } from '../../contexts/UserContext';
import { useLocation } from 'react-router-dom';
import { doc, updateDoc } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';


export const StdBooks = () => {

    const navigate = useNavigate()

    let { user, isAdmin } = useUser()


    const location = useLocation();

    if (isAdmin)
        user = location.state



    const [AllBooksList, setAllBooksList] = useState([{}])
    const [myBooksList, setMyBooksList] = useState([{}])
    const [books, setBooks] = useState([])

    const bookListCollectionRef = collection(db, "BooksList")


    const getAllBooksList = async () => {
        const data = await getDocs(bookListCollectionRef);
        setAllBooksList(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })))
    }

    useEffect(() => {
        getAllBooksList()
    }, [])
    // console.log(AllBooksList)



    useEffect(() => {
        setBooks(user?.issued)
    }, [user])
    // console.log(books)



    const getMyBooksList = () => {
        const updatedBooksList = [];
        AllBooksList?.forEach((book) => {
            books?.forEach((mybook) => {
                if (mybook === book.isbn) {
                    updatedBooksList.push(book);
                }
            });
        });
        setMyBooksList(updatedBooksList);
    }

    useEffect(() => {
        getMyBooksList();
    }, [books, AllBooksList]);


    const ReturnBook = async (book) => {
        const doDocUser = doc(db, "Users", user.id)
        const index = issuedBooks.indexOf(book.isbn)
        const change = { issued: [...issuedBooks.slice(0, index), ...issuedBooks.slice(index + 1)] }

        const doDocBook = doc(db, "BooksList", book.id)
        const availableChange = { available: book.available + 1 }

        await updateDoc(doDocBook, availableChange)
        await updateDoc(doDocUser, change)
        navigate(`/student/mybooks`)
    }


    const [issuedBooks, setIssuedBooks] = useState([])
    useEffect(() => {
        setIssuedBooks(user.issued)
    }, [user, issuedBooks])
    // console.log(issuedBooks)

    const [rowPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)


    return (

        <>
            <StdNavbar />
            <div className="heading">
                <Typography variant='h4' style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>My Issued Books</Typography>
            </div>

            {myBooksList?.length > 0 ? (
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
                                        <TableCell style={{ fontSize: "26px" }} align="right">Due Date</TableCell>
                                        <TableCell style={{ fontSize: "26px" }} align='right'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowPerPage > 0
                                        ? myBooksList.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                        : myBooksList
                                    ).map((book, index) => (
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
                                            <TableCell style={{ fontSize: "20px" }} align="right"></TableCell>
                                            <TableCell align="right">
                                                {!isAdmin && <>
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        size="small"
                                                        // to={`/mybooks/${book.isbn}`}
                                                        onClick={() => ReturnBook(book)}
                                                        style={{ background: "#2a9942", marginRight: "10px" }}
                                                    >Return</Button></>}
                                                <Button
                                                    variant="contained"
                                                    component={Link}
                                                    size="small"
                                                    to={!isAdmin ? `/student/mybooks/${book.isbn}/details` : `${book.isbn}/details`}
                                                    // onClick={() => navigate(`/books/${book.isbn}`)}
                                                    style={{ background: "#2a9942" }}
                                                    state={[book, user]}
                                                >Details</Button>
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
                            count={myBooksList.length}
                            rowsPerPage={rowPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                    </div>


                </>
            ) : (
                <Typography variant='h4'>{isAdmin ? `${user.name} haven't issued any books yet!` : "You haven't issued any books yet!"}</Typography>
            )
            }
        </>
    );
}
