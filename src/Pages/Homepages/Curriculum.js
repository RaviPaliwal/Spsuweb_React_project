import React from "react";
import Navbar from "./Navbar"
const Curriculum = () => {
  const timetableUrl = "https://example.com/timetable.pdf";
  const academicCalendarUrl = "http://localhost:5000/pdfs/AcedemicCalander.pdf";

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
    <Navbar/>
    <div>
      <h1>Curriculum</h1>
      <h2>Timetable</h2>
      <iframe title="Timetable" src={`https://docs.google.com/gview?url=${timetableUrl}&embedded=true`} width="100%" height="500" frameBorder="0"></iframe>
      <button onClick={() => handleDownload(timetableUrl)}>Download Timetable</button>
      <h2>Academic Calendar</h2>
      <iframe title="Academic Calendar" src={`https://docs.google.com/gview?url=${academicCalendarUrl}&embedded=true`} width="100%" height="500" frameBorder="0"></iframe>
      <button onClick={() => handleDownload(academicCalendarUrl)}>Download Academic Calendar</button>
      <p>Some additional details about our curriculum here...</p>
    </div></>
  );
};

export default Curriculum;
