import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InductionDashboard.css';

function InductionDashboard() {
  const [pendingVisitors, setPendingVisitors] = useState([]);
  const [searchToken, setSearchToken] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const fetchPending = async () => {
    const res = await axios.get('http://localhost:7000/api/induction/pending');
    setPendingVisitors(res.data);
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/visitors/search/${searchToken.trim()}`);
      setSearchResult(res.data);
    } catch (err) {
      alert('No visitor found for this token.');
      setSearchResult(null);
    }
  };

  const markComplete = async (token) => {
    await axios.post(`http://localhost:7000/api/induction/complete/${token}`);
    fetchPending();
    alert("Induction marked as complete!");
  };

  useEffect(() => {
    fetchPending();
    const interval = setInterval(fetchPending, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2>Security Induction Dashboard</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Enter token to search "
          value={searchToken}
          onChange={(e) => setSearchToken(e.target.value)}
        />
        <button1 onClick={handleSearch}>Search by Token</button1>
      </div>

      {searchResult && (
        <div className="card search-result">
          <h4>Search Result</h4>
          <p><strong>Name:</strong> {searchResult.name}</p>
          <p><strong>Visit Type:</strong> {searchResult.visitType}</p>
          <p><strong>Token:</strong> {searchResult.token}</p>
          <p><strong>Time In:</strong> {new Date(searchResult.timeIn).toLocaleString()}</p>
          {searchResult.visitType === 'Plant' && (
            <p><strong>Induction Status:</strong> {searchResult.inductionCompleted ? 'Completed' : 'Pending'}</p>
          )}
        </div>
      )}

      

      <div className="list">
        {pendingVisitors.length === 0 && <p className="no-pending">No pending plant visitors.</p>}
        {pendingVisitors.map(visitor => (
          <div key={visitor.token} className="card">
            <p><strong>Name:</strong> {visitor.name}</p>
            <p><strong>Token:</strong> {visitor.token}</p>
            <p><strong>Visit Type:</strong> {visitor.visitType}</p>
            <button onClick={() => markComplete(visitor.token)}>Mark Induction Complete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InductionDashboard;
