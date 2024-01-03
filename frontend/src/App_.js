import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [clubsData, setClubsData] = useState([]);
  const [newClub, setNewClub] = useState({ club_id: '', club_name: '', faculty_incharge: '' });
  const [editingClub, setEditingClub] = useState(null);


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


  const handleUpdateClub = async (club_id) => {
    try {
      await axios.put(`http://localhost:3000/api/clubs/${club_id}`, editingClub);
      const response = await axios.get('http://localhost:3000/api/clubs');
      setClubsData(response.data);
      setEditingClub(null);
    } catch (error) {
      console.error('Error updating club via Node.js server:', error.message);
    }
  };


  const handleDeleteClub = async (club_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/clubs/${club_id}`);
      const response = await axios.get('http://localhost:3000/api/clubs');
      setClubsData(response.data);
    } catch (error) {
      console.error('Error deleting club via Node.js server:', error.message);
    }
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
              <td>{editingClub === club.club_id ? (
                <input
                  type="text"
                  value={editingClub.club_name}
                  onChange={(e) => setEditingClub({ ...editingClub, club_name: e.target.value })}
                />
              ) : (
                club.club_name
              )}</td>
              <td>{editingClub === club.club_id ? (
                <input
                  type="text"
                  value={editingClub.faculty_incharge}
                  onChange={(e) => setEditingClub({ ...editingClub, faculty_incharge: e.target.value })}
                />
              ) : (
                club.faculty_incharge
              )}</td>
              <td>
                {editingClub === club.club_id ? (
                  <>
                    <button onClick={() => handleUpdateClub(club.club_id)}>Update</button>
                    <button onClick={() => setEditingClub(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingClub({ ...club })}>Edit</button>
                    <button onClick={() => handleDeleteClub(club.club_id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div>
        <h2>Edit Club</h2>
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
        <button onClick={handleAddClub}>Edit</button>
      </div>
    </div>
  );
}


export default App;
