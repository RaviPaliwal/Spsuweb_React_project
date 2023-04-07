import React, { useState, useEffect } from 'react';

const IndustryColab = () => {
  const [industryCollaborations, setIndustryCollaborations] = useState([]);

  useEffect(() => {
    const fetchIndustryCollaborations = async () => {
      const response = await fetch('http://localhost:5000/api/industry-colaborations');
      const data = await response.json();
      setIndustryCollaborations(data);
    };

    fetchIndustryCollaborations();
    
  }, []);

  return (
    <>
    <h2 style={{ color: '#52616b',marginTop:"2rem",textAlign: 'center', marginBottom: '1rem' }}>Industry Collaborations</h2>
    <p style={{ textAlign: 'center', marginBottom: '2rem' }}></p>
    <div className="container">
      <section
        className="mt-5"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'block',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {industryCollaborations.map((industryCollaboration) => (
            <div
              key={industryCollaboration._id}
              style={{
                marginTop:"1.5rem",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={`http://localhost:5000`+industryCollaboration.image.path}
                alt={industryCollaboration.title}
                style={{ marginBottom: '1.2rem', width: '150px' }}
              />
              <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {industryCollaboration.title}
              </h3>
              <p style={{ textAlign: 'center' }}>
                {industryCollaboration.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div></>
  );
};

export default IndustryColab;
