import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function FacultyPage() {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    async function fetchFacultyData() {
      const response = await fetch("http://localhost:5000/api/faculty/getfaculty");
      const data = await response.json();
      setFacultyData(data);
    }
    fetchFacultyData();
  }, []);

  return (
    <>
    <Navbar/>
    <div>
      <h1>Fp</h1>
      {facultyData.map((faculty) => (
        <div key={faculty._id}>
          <h2>{faculty.name}</h2>
          <p>{faculty.about}</p>
          <p>{faculty.post}</p>
          <img src={"http://localhost:5000"+faculty.image.path} alt={faculty.name} />
        </div>
      ))}
    </div>
    </>
  );
}

export default FacultyPage;
