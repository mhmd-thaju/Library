
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from "./pages/Main/Main"
import { StudentLogin } from './pages/Login/StudentLogin';
import { AdminLogin } from './pages/Login/AdminLogin';
import { StudentSignup } from './pages/Login/StudentSignup';
import { BooksList } from './pages/BookList/BooksList';
import { Student } from './pages/Student/Student';
import { StdBooks } from './pages/Student/StdBooks';
import { BookDetails } from './pages/BookList/BookDetails';
import { AllBookDetails } from './pages/BookList/AllBookDetails';
import { NotFound } from './pages/NotFound';
import { UserProvider } from './contexts/UserContext';
import { AddBook } from './pages/BookList/AddBook';
import { UserTable } from './pages/Student/UserTable';
import { UserProfile } from './pages/Student/UserProfile';
import { UpdateUser } from './pages/Student/UpdateUser';
import { ProfilePage } from './pages/Student/ProfilePage';


function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/studentlogin' element={<StudentLogin />} />
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/studentsignup' element={<StudentSignup />} />
            <Route path='/bookslist' element={<BooksList />} />
            <Route path='/student/home' element={<Student />} />
            <Route path='/admin/home' element={<Student />} />
            <Route path='/admin/users' element={<UserTable />} />
            <Route path='/admin/profile' element={<ProfilePage />} />
            <Route path='/admin/users/:id/profile' element={<UserProfile />} />
            <Route path='/student/:id/profile' element={<ProfilePage />} />
            <Route path='/student/:id/profile/update' element={<UpdateUser />} />
            <Route path='/admin/users/:id/profile/update' element={<UpdateUser />} />
            <Route path='/admin/users/:id/books' element={<StdBooks />} />
            <Route path='/admin/users/:id/books/:isbn/details' element={<BookDetails />} />
            <Route path='/admin/books/addbook' element={<AddBook />} />
            <Route path='/admin/books/:isbn/details/updatebook' element={<AddBook />} />
            <Route path='/student/mybooks' element={<StdBooks />} />
            <Route path='/student/mybooks/:isbn/details' element={<BookDetails />} />
            <Route path='/student/books/:isbn/details' element={<AllBookDetails />} />
            <Route path='/admin/books/:isbn/details' element={<AllBookDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
