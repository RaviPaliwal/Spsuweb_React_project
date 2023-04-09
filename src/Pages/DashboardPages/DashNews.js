import React, { useState, useEffect } from 'react';

function NewsManagement() {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/news/getall')
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

  const handleAddNews = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    fetch('/api/news/add', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setNewsList([...newsList, data]);
        setTitle('');
        setDescription('');
        setImage(null);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteNews = (newsId) => {
    fetch(`http://localhost:5000/api/news/${newsId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        setNewsList(newsList.filter(news => news._id !== newsId));
      })
      .catch(err => console.error(err));
  };

  const handleUpdateNews = (newsId) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    fetch(`/api/news/${newsId}`, {
      method: 'PATCH',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setNewsList(newsList.map(news => news._id === newsId ? data : news));
        setTitle('');
        setDescription('');
        setImage(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <form onSubmit={handleAddNews}>
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} required></textarea>
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit">Add News</button>
      </form>
      {newsList.map(news => (
        <div key={news._id}>
          <h3>{news.title}</h3>
          <p>{news.description}</p>
          {news.image && (
            <img src={`/api/news/image/${news._id}`} alt={news.title} />
          )}
          <button onClick={() => handleDeleteNews(news._id)}>Delete</button>
          <button onClick={() => handleUpdateNews(news._id)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default NewsManagement;
