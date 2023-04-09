import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const HomeAnnNews = () => {
  const [recAnn, setRecAnn] = useState([]);

  const date = () => {
    let currentDate = new Date();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    return `${cMonth}-${cYear}`;
  };

  useEffect(() => {
    const getRecAnn = async () => {
      let headersList = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      };

      let response = await fetch(`http://localhost:5000/api/announcement/getbymonth-year/${date()}`, {
        method: 'GET',
        headers: headersList,
      });

      let data = await response.json();
      //console.log(data);
      setRecAnn(data);
    };

    getRecAnn();
  }, []);

  const truncateTitle = (title) => {
    const maxLength = 30;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    }
    return title;
  };

  return (
    <div className='container my-5'>
      <h2 className='text-center mb-4' style={{ color: '#52616b' }}>Latest News and Announcements</h2>

      <Grid container spacing={2} justifyContent='center'>
        {recAnn.map((element) => (
          <Grid item key={element._id} xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
              <CardContent>
                <Typography variant='h5' gutterBottom component='div' sx={{ color: '#1abc9c', textAlign: 'center' }}>
                  {truncateTitle(element.title)}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center' }}>
                  {element.info}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>




      

      <div className='d-flex justify-content-center'>
        <Link to='/announcements'>
          <Button variant='contained' color='primary' sx={{ mt: 3 }}>
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeAnnNews;
