import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { db } from '../firebase/config';
import { collection, getDocs } from '@firebase/firestore';

const UserContext = createContext({
    user1: null,
    user: null
    // loginUser: () => { },
})


const useUser = () => useContext(UserContext)

const UserProvider = ({ children }) => {

    const userCollectionRef = collection(db, "Users")
    const [userList, setUserList] = useState([{}])


    const [user1, setUser1] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

    const [user, setUser] = useState({})


    useEffect(() => {
        // setBooks(userList.issued)
        getUserList()
        return () => getUserList()
    }, [])
    // console.log(userList)


    const getUserList = async () => {
        try {
            const user = await getDocs(userCollectionRef);
            setUserList(user.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }
        catch (error) {
            console.log(error)
        }
    }


    const getCurrUser = async () => {
        userList.map((each, index) => {
            if (each && user1 && each.email === user1.email)
                return setUser(each)
            else
                return null
        })
    }
    // console.log(currUser)

    useEffect(() => {
        getCurrUser()
    }, [userList, user1, user])



    useEffect(() => {
        setIsAdmin(user && user.role === "admin")
    }, [user])

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser1(currentUser)
            } else {
                setUser1(null)
            }
        })
    }, [user1])

    const loginUser = async (loginEmail, loginPassword) => {
        try {
            const use = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            // console.log(user1.user)
            setUser1(use)
            // navigate(`/student/home`)
        } catch (error) {
            console.log(error.message)
        }
    }

    const signupUser = async (regEmail, regPass, regName, regPhone) => {
        try {
            const use = await createUserWithEmailAndPassword(auth, regEmail, regPass)
            // console.log(user1.user)
            setUser1(use)
            await updateProfile(use.user, {
                displayName: regName,
                phoneNumber: regPhone,
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const logoutUser = async () => {
        setUser1(null)
        setIsAdmin(false)
        await signOut(auth)
    }







    return (
        <UserContext.Provider value={{ user1, loginUser, logoutUser, isAdmin, user, userList, signupUser, setUserList, getCurrUser }}>
            {children}
        </UserContext.Provider>
    )
}


export { useUser, UserProvider }
