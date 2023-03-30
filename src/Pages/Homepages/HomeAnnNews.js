import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      console.log(data);
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

      <div className='d-flex justify-content-center'>
        <div className='recannmaindiv row'>
          {recAnn.map((element) => (
            <div key={element._id} className='col-lg-4 col-md-6 col-sm-12 mb-4'>
              <div className='card recentanndiv' style={{ backgroundColor: '#f1f4f7', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <div className='card-body'>
                  <h5 className='card-title mb-2 text-truncate' style={{ color: '#1abc9c', textAlign: 'center' }}>
                    {truncateTitle(element.title)}
                  </h5>
                  <p className='card-text text-center'>{element.info}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='d-flex justify-content-center'>
        <Link to='/all-announcements'>
          <button className='btn btn-primary mt-3'>Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeAnnNews;
