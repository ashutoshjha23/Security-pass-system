import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SafetyInduction() {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Safety Induction Session</h2>
      <p>Please attend the safety induction session.</p>
      <p><strong>Location:</strong> pizza hut mein chale jao</p>
      <p>Your token: <strong>{token}</strong></p>
      <p>dhanyawad</p>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default SafetyInduction;
