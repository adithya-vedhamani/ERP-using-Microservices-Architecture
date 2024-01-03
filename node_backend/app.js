const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Route to get clubs from the Flask server
app.get('/api/clubs', async (req, res) => {
  try {
    const flaskResponse = await axios.get('http://127.0.0.1:5000/api/clubs');
    res.json(flaskResponse.data);
    
  } catch (error) {
    console.error('Error fetching data from Flask server:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a club
app.post('/api/clubs/add', async (req, res) => {
  try {
    // Retrieve club data from the request body
    const { club_id, club_name, faculty_incharge } = req.body;

    // Make a POST request to the Flask server
    const flaskResponse = await axios.post('http://127.0.0.1:5000/api/clubs/add', {
      club_id,
      club_name,
      faculty_incharge,
    });

    res.json(flaskResponse.data);
  } catch (error) {
    console.error('Error adding club via Flask server:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a club by ID
app.get('/api/clubs/:club_id', async (req, res) => {
  try {
    const { club_id } = req.params;

    // Make a GET request to the Flask server with the club_id
    const flaskResponse = await axios.get(`http://127.0.0.1:5000/api/clubs/${club_id}`);
    res.json(flaskResponse.data);
  } catch (error) {
    console.error('Error fetching club by ID from Flask server:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a club by ID
app.put('/api/clubs/:club_id', async (req, res) => {
  try {
    const { club_id } = req.params;
    const { club_name, faculty_incharge } = req.body;

    // Make a PUT request to the Flask server with the updated club information
    const flaskResponse = await axios.put(`http://127.0.0.1:5000/api/clubs/update/${club_id}`, {
      club_name,
      faculty_incharge,
    });

    res.json(flaskResponse.data);
  } catch (error) {
    console.error('Error updating club via Flask server:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a club by ID
app.delete('/api/clubs/:club_id', async (req, res) => {
  try {
    const { club_id } = req.params;

    // Make a DELETE request to the Flask server with the club_id
    const flaskResponse = await axios.delete(`http://127.0.0.1:5000/api/clubs/delete/${club_id}`);
    res.json(flaskResponse.data);
  } catch (error) {
    console.error('Error deleting club via Flask server:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Node.js BFF listening at http://localhost:${port}`);
});
