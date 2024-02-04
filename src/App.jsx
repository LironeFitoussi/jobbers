import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authentification from './pages/Authentication/Authentication.jsx'
import Home from './pages/Home/Home.jsx'
import Matches from './pages/Matches/Matches.jsx'
import CardCreator from './pages/CardCreator/CardCreator.jsx';

function App() {

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/auth' element={< Authentification />} />
        <Route path='/matches' element={< Matches />} />
        <Route path='/creator' element={< CardCreator />} />
        {/* <Route path='/settigns' element={< Settings />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
