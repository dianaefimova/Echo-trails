import React, { useState, useEffect } from "react";
import './header.css';

const Header = () => {
    const [firstVisible, setFirstVisible] = useState(true);
    const [secondVisible, setSecondVisible] = useState(false);
  
    useEffect(() => {
      // Show first header and set a timer to hide it
      const firstTimer = setTimeout(() => {
        setFirstVisible(false);
        setSecondVisible(true); 
      }, 6000); 
  
      // Timer to hide the second header
      const secondTimer = setTimeout(() => {
        setSecondVisible(false);
      }, 12000); 
  
      return () => {
        clearTimeout(firstTimer);
        clearTimeout(secondTimer);
      };
    }, []);
  
    return (
      <div>
        {firstVisible && (
          <div className={`header ${firstVisible ? "pop-up" : "fade-out"}`}>
            <h2>Explore the Nordic Wonders</h2>
          </div>
        )}
        {secondVisible && (
          <div className={`header second-header ${secondVisible ? "pop-up" : "fade-out"}`}>
            <h2>Take a test to check your knowladge!</h2>
          </div>
        )}
      </div>
    );
  };

export default Header;
