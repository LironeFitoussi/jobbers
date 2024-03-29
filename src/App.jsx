import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/User.jsx";

import Authentification from "./pages/Authentication/Authentication.jsx";
import Find from "./pages/Find/Find.jsx";
import Matches from "./pages/Matches/Matches.jsx";
import CardCreator from "./pages/CardCreator/CardCreator.jsx";
import MyServices from "./pages/MyServices/MyServices.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Header from "./components/Header/Header.jsx";

import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext)
  return (
    <BrowserRouter> 
      <Header /> 
      {user?.role=="Admin"? <Routes>
      <Route path="/" element={<MyServices isAdmin={true} />} />
      </Routes>:null}
      
    {user?.role=="User"? <Routes>
      <Route path="/" element={<MyServices />} />
      <Route path="/find/:id" element={<Find />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/creator" element={<CardCreator />} />
      <Route path="/myServices" element={<MyServices />} />
    </Routes> :
    <Routes>
      <Route path="/" element={<Authentification />} />
    </Routes>}
  
  <Navbar />
</BrowserRouter>
    );
  }
  
  
  export default App;
  
  // <BrowserRouter>
  //   <Header />
  //   {user ? <Routes>
  //     <Route path="/" element={<MyServices />} />
  //     <Route path="/find/:id" element={<Find />} />
  //     <Route path="/matches" element={<Matches />} />
  //     <Route path="/creator" element={<CardCreator />} />
  //     {/* <Route path="/myServices" element={<MyServices />} /> */}
  //   </Routes> :
  //     <Routes>
  //       <Route path="/" element={<Authentification />} />
  //     </Routes>}
  //   <Navbar />
  // </BrowserRouter>