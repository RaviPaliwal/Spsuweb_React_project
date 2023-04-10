import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import AnnouncementItem from "./AnnouncementItem"
import BottomNavbar from "./BottomNavbar"
import AllNews from './AllNews'
const Announcement = () => {
  const [item,setitem]= useState([])
  

  
  useEffect(()=>{
    const getdata= async ()=>{
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       
       let response = await fetch("http://127.0.0.1:5000/api/announcement/getall", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       //console.log(data);
       setitem(data)
       
       
    }
    getdata();
  },[setitem])


return(<>
<Navbar/>

<p style={{backgroundColor:'#1abc9c'}} className="allann container rounded-pill shadow d-flex row justify-content-center  mt-2  btn ">Announcements</p>
{item.map((elem)=>{
  return (
    <div key={elem._id} className="col">
      <AnnouncementItem  title={elem.title} info={elem.info} />
    </div>
  )
})}

<p style={{backgroundColor:'#1abc9c'}} className="allann container rounded-pill shadow d-flex row justify-content-center  mt-2  btn ">News and Events</p>
<AllNews/>
    <BottomNavbar/>


</>
)
}


export default Announcement
