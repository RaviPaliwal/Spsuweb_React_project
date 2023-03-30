import React from 'react'
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Placements = () => {
      return (
        <div className="placement-section">
          <div className="placement-item">
            <div className="placement-icon">
              <FaUser className='text-primary h1'/>
            </div>
            <div className="placement-details">
              <h3>Placement</h3>
              <p>100%</p>
            </div>
          </div>
          <div className="placement-item">
            <div className="placement-icon ">
              <FaMapMarkerAlt className='text-success h1'/>
            </div>
            <div className="placement-details">
              <h3>Locations</h3>
              <p>50+</p>
            </div>
          </div>
          <div className="placement-item">
            <div className="placement-icon">
              <FaBriefcase className='text-danger h1' />
            </div>
            <div className="placement-details">
              <h3>Companies</h3>
              <p>100+</p>
            </div>
          </div>
          <div className="placement-item">
            <div className="placement-icon">
              <FaGraduationCap className='h1' />
            </div> 
            <div className="placement-details">
              <h3>Courses</h3>
              <p>20+</p>
            </div>
          </div>
        </div>
      );
    }
    
export default Placements
