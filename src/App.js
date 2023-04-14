import Login from "./Pages/Login";
import Notification from "./Pages/Notification";
import {createBrowserRouter,createRoutesFromElements,Route ,RouterProvider} from "react-router-dom";
import AlertState from "./Contexts/Alert/AlertState";
import Dashboard from "./Pages/DashboardPages/Dashboard";
import Homepage from "./Pages/Homepages/Homepage";
import Announcement from "./Pages/Homepages/Announcement";
import DashAnnouncement from "./Pages/DashboardPages/DashAnnouncement";
import DashCarousel from "./Pages/DashboardPages/DashCarousel";
import About from "./Pages/Homepages/About";
import DashFaculty from "./Pages/DashboardPages/DashFaculty";
import Contact from "./Pages/Homepages/Contact";
import DashIndustryColab from "./Pages/DashboardPages/DashIndustryColab"
import FacultyPage from "./Pages/Homepages/FacultyPage";

function App() {
  const router =createBrowserRouter(
    createRoutesFromElements(
      <Route path="/"  >
        {/* All Gen PUrpose Routes */}
        <Route index element={<Homepage/>}/>
        <Route path="/announcements" element={<Announcement/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<AlertState><Contact/></AlertState>}/>  
        <Route path="/faculty" element={<FacultyPage/>}  />
       
        
        
        
        {/* All Admin Routes */}
        <Route path="/admin/dashboard" element={
        <>
        <AlertState>
        <Dashboard/>
        <Notification/>
        </AlertState>
        </>
        }/>

        <Route path="/admin/dashboard/announcement" element={
        <>
        <AlertState>
        <Notification/> 
        <DashAnnouncement/>
        </AlertState>
        </>
        }/>

<Route path="/admin/dashboard/carousels" element={
        <>
        <AlertState>
        <Notification/> 
        <DashCarousel/>  
        </AlertState>
        </>
        }/>

<Route path="/admin/dashboard/industrycolab" element={
        <>
        <AlertState>
        <Notification/>
        <DashIndustryColab/>
        </AlertState>
        </>
        }/>

<Route path="/admin/dashboard/faculty" element={
        <>
        <AlertState>
        <Notification/> 
        <DashFaculty/>  
        </AlertState>
        </>
        }/>  
              
          
        <Route path="/admin/login" element={
        <>
        <AlertState>
        <Notification/>
        <Login />
        </AlertState>
        </>
        }/>

      </Route>
    )
    )
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
