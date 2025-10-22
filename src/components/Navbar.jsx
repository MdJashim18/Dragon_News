import React, { use } from "react";
import { Link, NavLink } from "react-router";
import userImg from "../assets/user.png";
import { AuthContext } from "../Provider/AuthProvider";
const Navbar = () => {
  const { user, LogOut } = use(AuthContext)

  const handleLogOut = () => {
    // console.log("Log Out")
    LogOut().then(() => {
      // Sign-out successful.
      alert("Sign-out successful")
    }).catch((error) => {
      // An error happened.
      console.log(error.message)
    });
  }


  return (
    <div className="flex justify-between items-center">
      <div className="">{user && user.email} </div>
      <div className="nav flex gap-5 text-accent">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/career">Career</NavLink>
      </div>
      <div className="login-btn flex gap-5">
        <img className="w-12 rounded-full" src={`${user ? user.photoURL : userImg}`} alt="" />
        {
          user ? <button onClick={handleLogOut} className="btn btn-primary px-10 ">Log Out</button> : <Link to="/auth/login" className="btn btn-primary px-10 ">Login</Link>
        }

      </div>
    </div>
  );
};

export default Navbar;
