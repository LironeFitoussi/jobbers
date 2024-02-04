import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authentification from './pages/Authentication/Authentication.jsx'
import Home from './pages/Home/Home.jsx'
import Matches from './pages/Matches/Matches.jsx'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/auth' element={< Authentification />} />
        <Route path='/matches' element={< Matches />} />
        <Route path='/settigns' element={< Settings />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
