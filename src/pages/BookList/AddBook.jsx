import React, { useState, useEffect } from 'react'
import { StdNavbar } from '../../components/Navbar/StdNavbar'
import { Typography } from '@mui/material'
import "./Books.css"
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'



import { db } from '../../firebase/config'
import { collection } from '@firebase/firestore'
import { addDoc, updateDoc, getDocs } from '@firebase/firestore'
import { doc } from '@firebase/firestore'

export const AddBook = () => {


    const location = useLocation()
    const [book, setBook] = useState({})
    useEffect(() => {
        setBook(location.state)
    }, [])




    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")
    const [isbn, setIsbn] = useState("")
    const [copies, setCopies] = useState("")
    const [available, setAvailable] = useState("")
    const [price, setPrice] = useState("")

    const bookListCollectionRef = collection(db, "BooksList")

    // const randomNum = () => {
    //     var minm = 1000000000000;
    //     var maxm = 9999999999999;
    //     return (Math.floor(Math.random() * (maxm - minm + 1)) + minm);
    // }


    const obj = {
        name: name || book?.name,
        isbn: isbn || book?.isbn,
        copies: copies || book?.copies,
        available: available || book?.available,
        price: price || book?.price,
        author: author || book?.author,
        category: category || book?.category
    }
    const navigate = useNavigate()

    const createBook = async () => {
        await addDoc(bookListCollectionRef, obj)
        navigate(`/admin/home`)
    }


    const [bookList, setBookList] = useState([])
    const getBookList = async () => {
        const data = await getDocs(bookListCollectionRef);
        // console.log(data.docs)
        setBookList(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })))
    }

    useEffect(() => {
        getBookList()
    }, [])
    useEffect(() => {
        getBookId()
    }, [bookList])

    const getBookId = () => {
        bookList.forEach(bk => {
            if (bk.isbn === book?.isbn)
                setBook(bk)
        });
    }


    const updateBook = async (id) => {
        const doDoc = doc(db, "BooksList", id)
        const change = obj
        await updateDoc(doDoc, change)
        navigate(`/admin/home`)
    }




    return (
        <div>
            <div>
                <StdNavbar />
            </div>

            <div className="detailcontainer">
                <div className="heading">
                    <Typography variant='h4' style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>Add Book</Typography>
                </div>
                <div className='form'>
                    <form action="#">
                        <div className="inputbox">
                            <label>Title</label>
                            <input type="text" required onChange={(e) => { setName(e.target.value) }} defaultValue={book?.name} />
                        </div>
                        <div>
                            <div className="flex">
                                <div className="inputbox">
                                    <label>Author</label>
                                    <input type="text" required onChange={(e) => { setAuthor(e.target.value) }} defaultValue={book?.author} />
                                </div>

                                <div className="inputbox">
                                    <label>Category</label>
                                    <input type="text" required onChange={(e) => { setCategory(e.target.value) }} defaultValue={book?.category} />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="inputbox">
                                    <label>ISBN</label>
                                    <input type="number" required onChange={(e) => { setIsbn(e.target.value) }} defaultValue={book?.isbn} />
                                </div>

                                <div className="inputbox">
                                    <label>Copies</label>
                                    <input type="number" required onChange={(e) => { setCopies(e.target.value) }} defaultValue={book?.copies} />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="inputbox">
                                    <label>Available</label>
                                    <input type="number" required onChange={(e) => { setAvailable(e.target.value) }} defaultValue={book?.available} />
                                </div>
                                <div className="inputbox">
                                    <label>Price</label>
                                    <input type="number" required onChange={(e) => { setPrice(e.target.value) }} defaultValue={book?.price} />
                                </div>
                            </div>

                        </div>

                    </form>
                    <div>
                        {book ? (
                            <Button
                                variant="contained"
                                component={Link}
                                size="small"
                                onClick={() => updateBook(book.id)}
                                style={{ background: "#2a9942", marginLeft: "5px", marginBottom: "20px", width: "100px", fontSize: "16px" }}
                            >UPDATE</Button>
                        ) : (
                            <Button
                                variant="contained"
                                component={Link}
                                size="small"
                                onClick={createBook}
                                style={{ background: "#2a9942", marginLeft: "5px", marginBottom: "20px", width: "100px", fontSize: "16px" }}
                            >ADD</Button>
                        )}
                        <Button
                            variant="contained"
                            component={Link}
                            size="small"
                            onClick={() => navigate(-1)}
                            style={{ background: "#2a9942", marginLeft: "5px", marginBottom: "20px", width: "100px", fontSize: "16px" }}
                        >CANCEL</Button>
                    </div>

                </div>

            </div>

        </div>
    )
}

