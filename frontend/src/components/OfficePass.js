import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

function OfficePass() {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Office Visit Pass</h2>
      <p>Your token: <strong>{token}</strong></p>
      <p>Show this token at the gate.</p>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default OfficePass;
