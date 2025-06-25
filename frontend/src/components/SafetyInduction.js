import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SafetyInduction() {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Safety Induction Session</h2>
      <p>Please attend the safety induction session.</p>
      <p><strong>Location:</strong> Security Induction Room</p>
      {/* Google Maps */}
      <div style={{ margin: '18px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d916.6857118706589!2d86.23560911354537!3d22.813669780008453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e2!4m3!3m2!1d22.8140344!2d86.23576229999999!4m3!3m2!1d22.8135755!2d86.23728559999999!5e1!3m2!1sen!2sin!4v1750833420615!5m2!1sen!2sin"
  width="500"
  height="350"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
      </div>
      <p>Your token: <strong>{token}</strong></p>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default SafetyInduction;