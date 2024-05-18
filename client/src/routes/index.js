import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import Allroutes from "./Allroutes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  return (
    <BrowserRouter>
      <div className="overflow-hidden">
        <div className="z-40 " style={{ zIndex: 2 }}>
          <Header />
        </div>
        <div className="z-20 " style={{ zIndex: 1 }}>
          <Allroutes />
        </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Index;
