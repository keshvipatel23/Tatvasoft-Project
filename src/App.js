import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Register}/>
        <Route path='/product-list' Component={ProductList}/>
        <Route path='/edit-product' Component={EditProduct}/>
        <Route path='/cart' Component={Cart}/>
        <Route path='/' Component={Login}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
