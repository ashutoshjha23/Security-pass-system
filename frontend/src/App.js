import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import VisitorForm from './components/VisitorForm';
import SafetyInduction from './components/SafetyInduction';
import OfficePass from './components/OfficePass';
import CurrentPeople from './components/CurrentPeople';
import Clock from './components/Clock';

import logo from './image/logo.png';

function App() {
  return (
    <>
      <header style={{
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        marginTop: '-160px',
        color: '#000',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '12px',
        fontWeight: 600,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="BlueScope Logo"
            style={{
              height: '70px',
              width: 'auto',
              borderRadius: '6px',
              marginRight: '20px'
            }}
          />
        </div>

        {/* Title */}
        <div style={{
          fontSize: '3rem',
          letterSpacing: '1px',
          flex: 1,
          textAlign: 'center'
        }}>
          BlueScope Visitor Pass System
        </div>

        {/* Clock */}
        <div style={{ fontSize: '1.1rem', textAlign: 'right' }}>
          <Clock />
        </div>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/visitor-form" element={<VisitorForm />} />
          <Route path="/induction/:token" element={<SafetyInduction />} />
          <Route path="/office-pass/:token" element={<OfficePass />} />
          <Route path="/current-people" element={<CurrentPeople />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
