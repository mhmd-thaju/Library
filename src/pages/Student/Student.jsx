import React from 'react'
import { StdNavbar } from "../../components/Navbar/StdNavbar"
import { BooksTable } from '../BookList/BooksTable'

export const Student = () => {
    return (
        <div>
            <StdNavbar />
            <BooksTable />
        </div>
    )
}
