import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './components/MainNavigation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import store from "./state/Store";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer className="toast"
            autoClose="1000" />
          <div>
            <Header />
            <main>
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
