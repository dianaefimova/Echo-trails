import './Pages.css';
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  onAuthStateChanged,
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import Snowfall from 'react-snowfall';


const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [scoreDataSw, setScoreDataSw] = useState(null);
  const [scoreDataNor, setScoreDataNor] = useState(null);
  const [scoreDataDen, setScoreDataDen] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [newPassword, setNewPassword] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isPasswordChanging, setIsPasswordChanging] = useState(false); 
  const [originalUsername, setOriginalUsername] = useState(""); 

  // Check authentication state and fetch user data if logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const currentUsername = user.displayName || "";
        setUsername(currentUsername);
        setOriginalUsername(currentUsername);
        fetchUserScore(user.uid);
        fetchUserScoreSw(user.uid);
        fetchUserScoreNor(user.uid);
        fetchUserScoreDen(user.uid);
      } else {
        setUser(null);
        setScoreData(null);
        setScoreDataSw(null);
        setScoreDataNor(null);
        setScoreDataDen(null);
        setUsername("");
        setOriginalUsername("");
      }
    });

    return unsubscribe;
  }, []);

  // Fetch score data from Firestore
  const fetchUserScore = async (uid) => {
    try {
      const docRef = doc(db, "scores", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setScoreData(docSnap.data());
      } else {
        console.log("No score found for this user");
      }
    } catch (error) {
      console.error("Error fetching user score:", error);
    }
  };

    // Fetch Sweden score data from Firestore
    const fetchUserScoreSw = async (uid) => {
      try {
        const docRef = doc(db, "scoresSw", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setScoreDataSw(docSnap.data());
        } else {
          console.log("No score found for this user");
        }
      } catch (error) {
        console.error("Error fetching user score:", error);
      }
    };


    // Fetch Norway score data from Firestore
    const fetchUserScoreNor = async (uid) => {
      try {
        const docRef = doc(db, "scoresNor", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setScoreDataNor(docSnap.data());
        } else {
          console.log("No score found for this user");
        }
      } catch (error) {
        console.error("Error fetching user score:", error);
      }
    };
        // Fetch Denmark score data from Firestore
        const fetchUserScoreDen = async (uid) => {
          try {
            const docRef = doc(db, "scoresDen", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setScoreDataDen(docSnap.data());
            } else {
              console.log("No score found for this user");
            }
          } catch (error) {
            console.error("Error fetching user score:", error);
          }
        };
  // Reauthenticate the user before updating password
  const reauthenticate = async () => {
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      console.log("Reauthenticated successfully");
      return true;
    } catch (error) {
      console.error("Reauthentication failed:", error);
      setErrorMessage("Reauthentication failed. Please check your password.");
      return false;
    }
  };

  // Handle saving password changes
  const handlePasswordChange = async () => {
    if (password && newPassword) {
      const isReauthenticated = await reauthenticate();
      if (!isReauthenticated) return;

      try {
        await updatePassword(user, newPassword);
        alert("Password updated successfully!");

        // Reset to original state after successful change
        setIsPasswordChanging(false);
        setPassword(""); 
        setNewPassword("");
      } catch (error) {
        console.error("Error updating password:", error);
        setErrorMessage("Failed to update password.");
      }
    }
  };

  // Handle saving profile changes (username)
  const handleProfileChange = async () => {
    if (username !== originalUsername) {
      try {
        await updateProfile(user, { displayName: username });
        alert("Profile updated successfully!");


        setIsEditing(false);
        setOriginalUsername(username);
      } catch (error) {
        console.error("Error updating profile:", error);
        setErrorMessage("Failed to update profile.");
      }
    } else {
      setIsEditing(false); 
    }
  };

  // Handle canceling profile changes
  const handleCancelProfileChange = () => {
    setUsername(originalUsername); 
    setIsEditing(false); 
  };

  return (
    <div>
              <div>
        <Snowfall
        zIndex="9999" 
        color="white" 
        style={{
        position: 'fixed', 
        top: 0,
        left: 0,
        zIndex: 9999, 
  }}
  snowflakeCount={150} 
/>
  </div>
      <h1>Your Account Information</h1>
      
      
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {user ? (
  <div>

    <span class="border-text">
      {!isEditing ? (
        <div>
          <h2><strong>Email:</strong>{user.email}</h2> 
          <h2>Username: {username}</h2>
          <div className="inline-buttons">
            <button onClick={() => setIsEditing(true)}>Change Username</button>
            <button onClick={() => setIsPasswordChanging(true)}>Change Password</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button onClick={handleProfileChange}>Save</button>
          <button onClick={handleCancelProfileChange}>Cancel</button>
        </div>
      )}

      {isPasswordChanging && (
        <div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Current Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handlePasswordChange}>Save Password Change</button>
          <button onClick={() => setIsPasswordChanging(false)}>Cancel</button>
        </div>
      )}
       
    </span>
    {scoreData ? (
      <div>
        <h4>Test Title: {scoreData.testTitle}</h4>
        <p>Your Score: {scoreData.score}</p>
      </div>
    ) : (

      <p>No score available, take a test about Finland!</p>
    )}

{scoreDataSw ? (
      <div>
        <h4>Test Title: {scoreDataSw.testTitleSw}</h4>
        <p>Your Score: {scoreDataSw.scoreSw}</p>
      </div>
    ) : (
      <p>No score available, take a test about Sweden!</p>
    )} 

{scoreDataNor ? (
      <div>
        <h4>Test Title: {scoreDataNor.testTitleNor}</h4>
        <p>Your Score: {scoreDataNor.scoreNor}</p>
      </div>
    ) : (
      <p>No score available, take a test about Norway!</p>
    )} 

{scoreDataDen ? (
      <div>
        <h4>Test Title: {scoreDataDen.testTitleDen}</h4>
        <p>Your Score: {scoreDataDen.scoreDen}</p>
      </div>
    ) : (
      <p>No score available, take a test about Denmark!</p>
    )} 

  </div> 
) : (
  <p>You must be logged in to view your account and scores.</p>
)}

    </div>
  );
};

export default AccountSettings;
