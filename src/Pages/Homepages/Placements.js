import React, { useEffect, useRef, useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Placements = () => {
  const [i, setI] = useState(1);
  const [j, setJ] = useState(1);
  const [k, setK] = useState(1);
  const [l, setL] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef();

  const handleFocus = (e) => {
    e.preventDefault();
    setIsFocused(true);
  };

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
      }, 12);
    }
    return () => clearInterval(intervalRef.current);
  }, [i,j,k,l,isFocused]);

  return (
    <>
    <h2 className='text-center mb-4' style={{ color: '#52616b' }}>Placements Records</h2>
    <div className="placement-section"on tabIndex="0">
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
