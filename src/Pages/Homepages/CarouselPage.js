import React, { useEffect,useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";


export default function App() {
  const [carousel,setcarousel]= useState([])
  useEffect(()=>{
    const getcarousel= async()=>{
      let headersList = {
        "Accept": "*/*",
       }
       let response = await fetch("http://34.125.182.92/api/carousel/getslides", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       setcarousel(data);
    }
        getcarousel();
  },[]);

  return (
    <>
      <Swiper 
        spaceBetween={2}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}

        className="mySwiper"
      >
        {
        carousel.map((element)=>{
          let uriraw = "http://34.125.182.92"+element.image.path;
          let uri =encodeURI(uriraw);
          //console.log(uri);
          return(
            <SwiperSlide key={element._id} className="text-center customSwiper">
              <div className="carmobile container-fluid-xl" style={{"backgroundImage": `url(${uri})`, "height":"45rem","backgroundPosition":"center","backgroundRepeat":"no-repeat","backgroundSize":"1280px"}}>
              <div className="carousel-caption d-none d-md-block" >
              <h1 className="col-12">{element.title}</h1>
              <h5   className="col-12">{element.info}</h5>
              </div>
              </div>
              </SwiperSlide>
          )
        })
      }
       
      </Swiper>
    </>
  );
}
