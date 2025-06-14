import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Layout/Header/Header';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import './styles/app.scss';
import ProtectedRoute from './components/Routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Navigate to="/products" />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
              <Route path="*" element={<Navigate to="/products" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;