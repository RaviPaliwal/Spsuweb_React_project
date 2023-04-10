import React, { useEffect, useRef, useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Placements = () => {
  const [i, setI] = useState(2);
  const [j, setJ] = useState(2);
  const [k, setK] = useState(2);
  const [l, setL] = useState(2);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef();

  const handleIntersection = (entries) => {
    const [entry] = entries;
    setIsFocused(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5,
    });

    observer.observe(document.querySelector('.placement-section'));

    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      intervalRef.current = setInterval(() => {
        if (i < 100) {
          setI(i + 1);
        }
        if (j < 50) {
          setJ(j + 1);
        }
        if (k < 100) {
          setK(k + 1);
        }
        if (l < 20) {
          setL(l + 1);
        }
      }, 1);
    }
    return () => clearInterval(intervalRef.current);
  }, [i,j,k,l,isFocused]);



  return (
    <>
    <h2 className='text-center mb-4' style={{ color: '#52616b' }}>Advantage CSE at Spsu</h2>
    <div className="placement-section container" tabIndex="0">
      <div className="placement-item">
        <div className="placement-icon">
          <FaUser className='text-primary h1'/>
        </div>
        <div className="placement-details">
          <h3>Placement</h3>
          <p>{i}%</p>
        </div>
      </div>
      <div className="placement-item">
        <div className="placement-icon ">
          <FaMapMarkerAlt className='text-success h1'/>
        </div>
        <div className="placement-details">
          <h3>Locations</h3>
          <p>{j}+</p>
        </div>
      </div>
      <div className="placement-item">
        <div className="placement-icon">
          <FaBriefcase className='text-danger h1' />
        </div>
        <div className="placement-details">
          <h3>Companies</h3>
          <p>{k}+</p>
        </div>
      </div>
      <div className="placement-item">
        <div className="placement-icon">
          <FaGraduationCap className='h1' />
        </div> 
        <div className="placement-details">
          <h3>Courses</h3>
          <p>{l}+</p>
        </div>
      </div>
    </div></>
  );
}

export default Placements;
