import React from 'react';
import './App.css';
import LoginModal from './Login';
import { useState} from 'react';

const Logging = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(true);
  
    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);

    return (
        <div className='login'>
        <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal}>
        </LoginModal>
        </div>


      );
};

export default Logging;