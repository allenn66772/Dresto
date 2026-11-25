import LandingPage from './common/Landingpage'
import { Outlet, Route, Routes } from 'react-router-dom'

// import RestaurantProfile from './RestuarentProfile'
import AddProfile from './Addprofile'
import AuthCard from './logins/AuthCard'
import Dashboard from './common/Dashboard'
import HotelOwnerAuthCard from './logins/HotelOwnerAuthCard'
// import RestaurantProfile from './features/restuarant/RestuarentProfile'
import ProtectedRoute from './ProtectedRoute'
import Selectplan from './hotelcomponents/Selectplan'
import Hotellayout from './layout/Hotellayout'
// import AuthCard from './app/AuthCard'

function App() {
  return (
    <>
      {/* <LandingPage/> */}
      <Routes>
        
        <Route path="/register" element={<AuthCard />} />
        <Route path='/owner/login' element={<HotelOwnerAuthCard />} />
        <Route path='/owner/register' element={<HotelOwnerAuthCard />} />
        <Route path='/login' element={<AuthCard />} />
        <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
          
        </Route>
       
        <Route path='/create-profile' element={<AddProfile />} />
       

        <Route element={<Hotellayout><Outlet /></Hotellayout>}>
         <Route path='/select-plan' element={<Selectplan/>}/>
          {/* <Route path='/restaurent-profile' element={<RestaurantProfile />} /> */}
          <Route path='/' element={<LandingPage />} />
          <Route path="/owner/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </>
  )
}

export default App