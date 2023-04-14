import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const API_BASE_URL = 'http://localhost:5000/api/news';

function NewsDashboard() {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchNewsList();
  }, []);

  const fetchNewsList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getall`);
      const data = await response.json();
      setNewsList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      setNewsList([...newsList, data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      const updatedNewsList = newsList.filter((news) => news._id !== id);
      setNewsList(updatedNewsList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>News Management Dashboard</h1>
      <form>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button variant="contained" onClick={handleAddNews}>Add News</Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsList.map((news) => (
              <TableRow key={news._id}>
                <TableCell>{news.title}</TableCell>
                <TableCell>{news.description}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleDeleteNews(news._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NewsDashboard;
