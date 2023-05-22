import { Route, Routes } from 'react-router-dom'
import Favorites from '../../pages/ Favorites/Favorites'
import Home from '../../pages/Home/Home'
import VacancyPage from '../../pages/VacancyPage/VacancyPage'


const AppRoutes = () => {
    return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/vacancy/:id" element={<VacancyPage />} />
      </Routes>
      
    )
  }
  
  export default AppRoutes