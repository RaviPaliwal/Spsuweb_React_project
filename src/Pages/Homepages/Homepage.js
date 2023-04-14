import React, { useEffect } from 'react'
import BottomNavbar from './BottomNavbar'
import Faculty from './Faculty'
import HomeAnnNews from './HomeAnnNews'
import Navbar from './Navbar'
import CarouselPage from './CarouselPage'
import IndustryColab from './IndustryColab'
import Placements from './Placements'
const Homepage = () => {
  //To Be Used In All PAges Under User Access
  useEffect(()=>{
    localStorage.setItem('loggedin',false)
    localStorage.setItem('auth-token',"")
  },[])
  
  return (
    <>
    <Navbar/>
    <CarouselPage/>
    <IndustryColab/>
    <hr/>
    <HomeAnnNews/>
    <Placements/>
    <Faculty/>
    <BottomNavbar/>
    </>
  )
}

export default Homepage
