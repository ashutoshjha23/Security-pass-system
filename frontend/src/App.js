import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import VisitorForm from './components/VisitorForm';
import SafetyInduction from './components/SafetyInduction';
import OfficePass from './components/OfficePass';
import CurrentPeople from './components/CurrentPeople';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/visitor-form" element={<VisitorForm />} />
        <Route path="/induction/:token" element={<SafetyInduction />} />
        <Route path="/office-pass/:token" element={<OfficePass />} />
        <Route path="/current-people" element={<CurrentPeople />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
