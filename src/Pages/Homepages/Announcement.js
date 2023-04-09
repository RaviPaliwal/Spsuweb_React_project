import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import AnnouncementItem from "./AnnouncementItem"
import Newsitem from "./NewsItem"
import BottomNavbar from "./BottomNavbar"
const Announcement = () => {
  const [item,setitem]= useState([])
  const [news, setNews] = useState([]);

  
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

useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch('http://localhost:5000/api/news/getall');
      const data = await response.json();
      setNews(data);
    };
    fetchNews();
  }, []);


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

<div className="container">
      <div className="d-flex flex-wrap justify-content-sm-center justify-justify-content-md-evenly">
        {news.map((item) => (
          <Newsitem
            key={item._id}
            title={item.title}
            description={item.description}
            imageUrl={item.image && "http://localhost:5000"+item.image.path}
            date={item.created_at}
          />
        ))}
      </div>
    </div>
    <BottomNavbar/>


</>
)
}


export default Announcement
