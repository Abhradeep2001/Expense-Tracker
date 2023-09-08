// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { Auth } from './pages/auth/index';
import { ExpenseTracker } from './pages/expense-tracker/index';

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/" exact element={<Auth/>}/>
        {/* Home Page (/expense tracker) */}
        <Route path="/expense-tracker" element={<ExpenseTracker/>}/>
      </Routes>
    </Router>
  )
}

export default App
