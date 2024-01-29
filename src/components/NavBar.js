import React, { useState } from "react";
import GoogleSignin from "../assets/imgs/Sign in with Google.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const NavBar = () => {

  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="nav-bar">
      {user ? (
        <div>
          <button onClick={signOut} className="sign-out" type="button">
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Quiz!</h1>
          <button className="sign-in">
            <img
              onClick={googleSignIn}
              src={GoogleSignin}
              alt="sign in with google"
              type="button"
            />
          </button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
