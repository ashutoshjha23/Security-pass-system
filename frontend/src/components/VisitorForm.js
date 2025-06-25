import React, { useState } from 'react';
import axios from 'axios';
import '../styles/VisitorForm.css';


function VisitorForm() {
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitType: 'Office'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/visitors/create-pass', formData);
    if (formData.visitType === 'Plant') {
      window.location.href = `/induction/${res.data.token}`;
    } else {
      window.location.href = `/office-pass/${res.data.token}`;
    }
  };

  return (
    <div className="container">
      <h2>Visitor Pass Form</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input placeholder="Aadhaar No." onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input placeholder="Phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
        <select onChange={(e) => setFormData({...formData, visitType: e.target.value})}>
          <option value="Office">Office Visit</option>
          <option value="Plant">Plant Visit</option>
        </select>
        <button type="submit">Generate Pass</button>
      </form>

    <button onClick={() => window.location.href = 'http://localhost:3000/'}>Go Back</button>
    </div>
  );
}

export default VisitorForm;
