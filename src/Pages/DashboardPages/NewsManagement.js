import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  TextField, 
  TextareaAutosize, 
  Typography 
} from '@mui/material';
import { 
  TableContainer, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
} from '@mui/material';


function NewsManagement() {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('http://34.125.182.92/api/news/getall')
      .then(res => res.json())
      .then(data => setNewsList(data))
      .catch(err => console.error(err));
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddNews = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    await fetch('http://34.125.182.92/api/news/add', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setNewsList([...newsList, data]);
        setTitle('');
        setDescription('');
        setImage('');
      })
      .catch(err => console.error(err));
  };

  const handleDeleteNews = (newsId) => {
    fetch(`http://34.125.182.92/api/news/${newsId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        setNewsList(newsList.filter(news => news._id !== newsId));
      })
      .catch(err => console.error(err));
  };


  return (
    <Container maxWidth="md" sx={{ mt: 5}}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Box component="form" onSubmit={handleAddNews} sx={{justifyContent:"center",alignItems:'center'}}>
            <Typography className='text-center' variant="h6" gutterBottom>
              Add News
            </Typography>
            <TextField 
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleTitleChange}
              required
              margin="normal"
            />
            <TextareaAutosize
              className='w-100 rounded-2'
              id="description"
              label="Description"
              placeholder="Enter description"
              minRows={5}
              value={description}
              onChange={handleDescriptionChange}
              required
            />
            <input 
            className='col-12 mb-3'
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <div className='text-center'>
            <Button 
              className='col-3'
              variant="contained"
              color="primary"
              type='submit'
              >Add</Button></div>
          </Box>
          </Grid>
          </Grid>

          
  <TableContainer component={Paper} sx={{mt:10}} className='shadow-lg'>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell width={100}>Title</TableCell>
        <TableCell>Description</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {newsList.map(news => (
        <TableRow key={news._id}>
          <TableCell component="th" scope="row" >
            {news.title}
          </TableCell>
          <TableCell>{news.description}</TableCell>
          <TableCell className='text-end'>
            <Button  variant="contained" color="primary" onClick={() => handleDeleteNews(news._id)}>Delete</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  </Container>
  );
}
export default NewsManagement;
