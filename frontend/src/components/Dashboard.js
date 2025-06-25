import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2> GATE PASS</h2>
      <button onClick={() => navigate('/visitor-form')}>Visitor Pass Form</button>
      <button onClick={() => navigate('/current-people')}>People Currently Inside</button>
    </div>
  );
}

export default Dashboard;
