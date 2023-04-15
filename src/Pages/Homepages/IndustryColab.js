import React, { useState, useEffect } from 'react';
import icimg from "../../Assets/collabsvg.svg"
const IndustryColab = () => {
  const [industryCollaborations, setIndustryCollaborations] = useState([]);

  useEffect(() => {
    const fetchIndustryCollaborations = async () => {
      const response = await fetch('http://34.125.182.92/api/industry-colaborations');
      const data = await response.json();
      setIndustryCollaborations(data);
    };

    fetchIndustryCollaborations();
    
  }, []);

  return (
    <>
    <h2 style={{ color: '#52616b',marginTop:"2rem",textAlign: 'center', marginBottom: '1rem' }}>Industry Collaborations</h2>
    <div className="conatainer text-center mt-5 ">
      <img className='icimg w-25' src={icimg} alt="industry Collab" />
    </div>
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
                src={`http://34.125.182.92`+industryCollaboration.image.path}
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
