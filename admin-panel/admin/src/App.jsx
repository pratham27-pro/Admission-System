// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserDetails from './pages/UserDetails.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/candidate/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
