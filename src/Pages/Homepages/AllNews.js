import React from 'react'
import { useEffect,useState } from 'react';
import Newsitem from "./NewsItem"


const AllNews = () => {
const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
          const response = await fetch('http://34.125.182.92/api/news/getall');
          const data = await response.json();
          setNews(data);
        };
        fetchNews();
      }, []);
  return (
    <>
    <div className="container">
      <div className="d-flex flex-wrap justify-content-sm-center justify-justify-content-md-evenly">
        {news.map((item) => (
          <Newsitem
            key={item._id}
            title={item.title}
            description={item.description}
            imageUrl={item.image && "http://34.125.182.92"+item.image.path}
            date={item.created_at}
          />
        ))}
      </div>
    </div>
    </>
  )
}

export default AllNews
