import { Route, Routes } from 'react-router-dom'
import Favorites from '../../pages/ Favorites/Favorites'
import Home from '../../pages/Home/Home'


const AppRoutes = () => {
    return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
      </Routes>
      
    )
  }
  
  export default AppRoutes