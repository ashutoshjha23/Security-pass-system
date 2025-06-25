import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CurrentPeople.css';


function CurrentPeople() {
  const [people, setPeople] = useState([]);
  const [searchToken, setSearchToken] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      const res = await axios.get('http://localhost:5000/api/visitors/passes');
      setPeople(res.data);
    };
    fetchPeople();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/visitors/search/${searchToken.trim()}`);
      setSearchResult(res.data);
    } catch (err) {
      alert('No visitor found for this token.');
      setSearchResult(null);
    }
  };

  return (
    <div className="container">
      <h2>People Currently Inside</h2>

      <input
        placeholder="Enter token to search"
        value={searchToken}
        onChange={(e) => setSearchToken(e.target.value)}
      />
      <button onClick={handleSearch}>Search by Token</button>

      {searchResult && (
        <div className="card">
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

      <h4>Office Visitors</h4>
      {people.filter(p => p.visitType === 'Office').map(person => (
        <div key={person._id} className="card">
          <p><strong>Name:</strong> {person.name}</p>
          <p><strong>Token:</strong> {person.token}</p>
          <p><strong>Time In:</strong> {new Date(person.timeIn).toLocaleString()}</p>
        </div>
      ))}

      <h4>Plant Visitors</h4>
      {people.filter(p => p.visitType === 'Plant').map(person => (
        <div key={person._id} className="card">
          <p><strong>Name:</strong> {person.name}</p>
          <p><strong>Token:</strong> {person.token}</p>
          <p><strong>Time In:</strong> {new Date(person.timeIn).toLocaleString()}</p>
          <p><strong>Induction Status:</strong> {person.inductionCompleted ? 'Completed' : 'Pending'}</p>
        </div>
      ))}

      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default CurrentPeople;
