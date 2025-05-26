import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './admin/components/ProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/home';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import DrugDetail from './pages/drugs/DrugDetails';
import DrugByLetter from './components/DrugByLetter';

import AdminDashboard from './admin/pages/adminDashboard';
import AdminLogin from './admin/pages/adminLogin';

function ClientLayout() {
  const location = useLocation();
  const noNavbarPaths = ["/login", "/register"];
  const showNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/drug/:id" element={<DrugDetail />} />
          <Route path="/browse/:letter" element={<DrugByLetter />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard activeMenu="users" />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/medicines" 
          element={
            <ProtectedRoute>
              <AdminDashboard activeMenu="medicines" />
            </ProtectedRoute>
          } 
        />
           <Route 
          path="/dashboard/news" 
          element={
            <ProtectedRoute>
              <AdminDashboard activeMenu="news" />
            </ProtectedRoute>
          } 
        />

        <Route path="/*" element={<ClientLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
