import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from "../pages/Notfound"; 
import Register from '../pages/Register';
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";




export default function AppRoutes() {
  return (
    <Routes>

     <Route path="/" element={<Home />} />
     <Route path="*" element={<NotFound />} />
     <Route path="register" element={<Register />} />
     <Route path="/login" element={<Login />} />
     <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}