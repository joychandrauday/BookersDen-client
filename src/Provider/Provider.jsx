import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [librarian, setLibrarian] = useState(false);
  useEffect(() => {
    // Function to fetch librarian data
    const fetchLibrarianData = async () => {
      try {
        // Check if user is authenticated
        if (user) {
          // Make request to server endpoint with user's email
          const response = await axios.get(
            `https://bookersdenserver.vercel.app/librarian/${user.email}`
          );
          // Check if librarian data exists
          setLibrarian(!!response.data);
        }
      } catch (error) {
        console.error("Error fetching librarian data:", error);
      }
    };

    // Call the fetchLibrarianData function
    fetchLibrarianData();
  }, [user]);
  const userSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (Name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: `${Name}`,
      photoURL: `${photoURL}`,
    });
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if(currentUser){
        const loggedUser={email: currentUser.email}
        axios.post(loggedUser,{withCredintials:true})
        .then(res=>{
            console.log(res.data);
        })
      }
    });
    return () => {
      unSubscribe;
    };
  }, [reload]);
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //googlesign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const githubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };
  //log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userInfo = {
    user,
    librarian,
    setUser,
    setReload,
    userSignUp,
    updateUser,
    signInUser,
    loading,
    logOut,
    googleSignIn,
    githubSignIn,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default Provider;
