import React from 'react'
import { BooksTable } from "./BooksTable"
import { MainNavbar } from "../../components/Navbar/MainNavbar"

export const BooksList = () => {
    return (
        <div>
            <MainNavbar />
            <BooksTable />
        </div>
    )
}
