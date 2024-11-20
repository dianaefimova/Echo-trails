import React, { useState, useEffect, useRef } from 'react';
import { auth } from './firebase';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Map from './Map';
import Logging from './Logging';
import Tests from './Tests';
import Profile from './Profile';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useLocation } from 'react-router-dom';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null); 
  const location = useLocation();

  

  //Menu dropdown
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
}, []);



// Close menu after page is changed
useEffect(() => {
  setIsMenuOpen(false);
}, [location]);

const handleLogout = async () => {
  try {
      await signOut(auth);
      console.log("User logged out");
  } catch (error) {
      console.error("Error logging out: ", error.message);
  }
};
  return (
<div>
      <div className="nav">
        <header>
          <button onClick={toggleMenu} className="menu-button">
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          {isMenuOpen && (
            <div ref={menuRef} className="menu">
            <nav className="dropdown-menu">
              <ul>
                
                  <Link to="/">Map</Link>
                  <Link to="/Tests">Tests</Link>
                  <Link to="/Profile">Profile</Link>               
              </ul>   
            </nav>
          </div>
          )}
           <div style={{ position: 'fixed', right: '1rem', top: '1rem' }}>
            {!user ? (
          <div>
              <Link to="/logging">
                <button>Log In</button>
              </Link>
              <div style={{ position: 'fixed', right: '25rem', top: '1rem', zIndex: '9999' }}>
                Login to save your progress
              </div>
          </div>        
      ) : (
          <div>
              <div style={{ position: 'fixed', right: '5rem', top: '1rem' }}>
                <button onClick={handleLogout}>Logout</button>
              </div>
        </div>
            )}
            </div>
</header>
</div>

        <main>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/logging" element={<Logging />} />
            <Route path="/Tests" element={<Tests />} />
            <Route path="/Profile" element={<Profile />} />
            
          </Routes>
         
        </main>
      
     
        </div>
  
  );
}

export default App;
