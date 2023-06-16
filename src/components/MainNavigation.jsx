import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import BookListing from "../pages/BookListing";
import EditBook from "../pages/Book/EditBook";
import Book from "../pages/Book/Book";
import EditUser from "../pages/User/EditUser";
import User from "../pages/User/User";
import UpdateProfile from "../pages/Profile/UpdateProfile";
import EditCategory from "../pages/Category/EditCategory";
import Category from "../pages/Category/Category";
import Cart from "../pages/Cart/Cart";
import { useSelector } from "react-redux";

const AppRoutes=()=>{
    const authData = useSelector((state) => state.auth.user);
    return(
        <Routes>
            <Route exact path='/login' element={!authData.id ? <Login/>  :<Navigate to = '/bookList'/>}/>
            <Route exact path='/' element={authData.id ? <Navigate to = '/bookList'/> : <Navigate to ='/login'/>}/>
            <Route exact path='/register' element={!authData.id ?<Register/> :<Navigate to = '/bookList'/> } />
            <Route exact path="/bookList" element={authData.id ?<BookListing/> :<Navigate to = '/login'/> }/>
            <Route exact path='/book' element={authData.id ? <Book /> : <Navigate to = '/login'/>} />
            <Route exact path='/categories' element={authData.id ?<Category /> : <Navigate to = '/login'/>} />
            <Route exact path='/edit_book' element={authData.id ?<EditBook /> : <Navigate to = '/login'/>} />
            <Route exact path='/edit_book/:id' element={authData.id ?<EditBook /> : <Navigate to = '/login'/>} />
            <Route exact path='/edit-user/:id' element={authData.id ?<EditUser /> : <Navigate to = '/login'/>} />
            <Route exact path='/add-category/:id' element={authData.id ?<EditCategory /> : <Navigate to = '/login'/>} />
            <Route exact path='/add-category' element={authData.id ?<EditCategory /> : <Navigate to = '/login'/>} />
            <Route exact path='/updateProfile' element={authData.id ?<UpdateProfile /> : <Navigate to = '/login'/>} />
            <Route exact path='/user' element={authData.id ?<User/>:<Navigate to = '/login'/>} />
            <Route exact path='/cart' element={authData.id ?<Cart />:<Navigate to = '/login'/>} />
        </Routes>
    );
}
export default AppRoutes;