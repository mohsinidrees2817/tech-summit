import React from "react";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/authentication/Signin";
import Signup from "../pages/authentication/Signup";
import Userprofile from "../pages/userprofile";
import Privateroute from "../components/Privateroute";
import Favourites from "../pages/favourites";
import Class from "../pages/class";
import Quiz from "../pages/Quiz/Quiz.jsx";
const Allroutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/class/:id" element={<Class />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route element={<Privateroute />}>
          <Route path="/profile" element={<Userprofile />} />
        </Route>
      </Routes>
    </>
  );
};

export default Allroutes;
