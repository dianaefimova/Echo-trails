import React, { useState } from 'react';
import Modal from 'react-modal';
import { auth } from './firebase';
import { signInWithEmailAndPassword,  createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root'); 


const Login = ({ isOpen}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); 
    const [error, setError] = useState('');
    const [username,setUserName] = useState('');
    const navigate = useNavigate(); 
  
    // Handling login
    const handleLogin = async (e) => {
      e.preventDefault();
      setError(''); 
  
      try {
        await signInWithEmailAndPassword(auth, email, password, username);
        console.log('Login successful!');
        navigate('/'); 
      } catch (err) {
        setError(err.message);
      }
    };

  // Handling signup
    const handleSignup = async (e) => {
      e.preventDefault();
      setError(''); 
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); // No username here
        const user = userCredential.user;

      // In order to be able to show and update the username
      // Update displayName after successful sign-up
      await updateProfile(user, {
        displayName: username, // Set the username as displayName
      });

      // Send email verification after successful sign-up
      await sendEmailVerification(user);
      console.log('Signup successful! Please verify your email.');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };



  

  return (
    
    <Modal isOpen={isOpen} contentLabel="Login Modal">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <div>
          <label>Email:  </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <br></br>
        <div>
          <label>Password:  </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <br></br>
        <div>
            <label>Username: </label>
            <input 
            type="username"
            value={username}
            onChangeCapture={(e) => setUserName(e.target.value)}
            required
            />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
      {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </Modal>
   
  );
};

export default Login;
