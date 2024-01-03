import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [clubsData, setClubsData] = useState([]);
  const [clubForm, setClubForm] = useState({ club_id: '', club_name: '', faculty_incharge: '' });
  const [newClub, setNewClub] = useState({ club_id: '', club_name: '', faculty_incharge: '' });
  
  useEffect(() => {
    axios.get('http://localhost:3000/api/clubs')
      .then(response => {
        console.log('Response from Node.js server:', response.data);
        setClubsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from Node.js server:', error.message);
      });
  }, []);

  const handleAddClub = async () => {
    try {
      await axios.post('http://localhost:3000/api/clubs/add', newClub);
      const response = await axios.get('http://localhost:3000/api/clubs');
      setClubsData(response.data);
      setNewClub({ club_id: '', club_name: '', faculty_incharge: '' });
    } catch (error) {
      console.error('Error adding club via Node.js server:', error.message);
    }
  };


  const handleAddOrUpdateClub = async () => {
    try {

      await axios.put(`http://localhost:3000/api/clubs/${clubForm.club_id}`, clubForm);
      const response = await axios.get('http://localhost:3000/api/clubs');
      setClubsData(response.data);
      setClubForm({ club_id: '', club_name: '', faculty_incharge: '' });
    } catch (error) {
      console.error('Error adding/updating club via Node.js server:', error.message);
    }
  };


  const handleDeleteClub = async (club_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/clubs/${club_id}`);
      // Refresh clubs data after deleting
      const response = await axios.get('http://localhost:3000/api/clubs');
      setClubsData(response.data);
    } catch (error) {
      console.error('Error deleting club via Node.js server:', error.message);
    }
  };

  const handleEditClub = (club) => {
    // Set the form state with the club details for editing
    setClubForm({ ...club });
  };

  
  return (
    <div>
      <h1>Clubs Data</h1>


      <div>
        <h2>Add Club</h2>
        <label>
          Club ID:
          <input
            type="text"
            value={newClub.club_id}
            onChange={(e) => setNewClub({ ...newClub, club_id: e.target.value })}
          />
        </label>
        <label>
          Club Name:
          <input
            type="text"
            value={newClub.club_name}
            onChange={(e) => setNewClub({ ...newClub, club_name: e.target.value })}
          />
        </label>
        <label>
          Faculty Incharge:
          <input
            type="text"
            value={newClub.faculty_incharge}
            onChange={(e) => setNewClub({ ...newClub, faculty_incharge: e.target.value })}
          />
        </label>
        <button onClick={handleAddClub}>Add</button>
      </div>


      <div>
        <h2>Edit Club</h2>
        <label>
          Club ID:
          <input
            type="text"
            value={clubForm.club_id}
            onChange={(e) => setClubForm({ ...clubForm, club_id: e.target.value })}
          />
        </label>
        <label>
          Club Name:
          <input
            type="text"
            value={clubForm.club_name}
            onChange={(e) => setClubForm({ ...clubForm, club_name: e.target.value })}
          />
        </label>
        <label>
          Faculty Incharge:
          <input
            type="text"
            value={clubForm.faculty_incharge}
            onChange={(e) => setClubForm({ ...clubForm, faculty_incharge: e.target.value })}
          />
        </label>
        <button onClick={handleAddOrUpdateClub}>
          {clubForm.club_id ? 'Update' : 'Add'}
        </button>
      </div>


      {/* List of clubs with update and delete buttons */}
      <table>
        <thead>
          <tr>
            <th>Club Name</th>
            <th>Faculty Incharge</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubsData.map(club => (
            <tr key={club.club_id}>
              <td>{club.club_name}</td>
              <td>{club.faculty_incharge}</td>
              <td>
                <button onClick={() => handleEditClub(club)}>Edit</button>
                <button onClick={() => handleDeleteClub(club.club_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;
