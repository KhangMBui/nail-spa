// import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./WelcomePage.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Swal from "sweetalert2";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-page-container">
      <div className="welcome-spa-title">
        <p>Welcome To</p>
        <h1>Nail Spa Bliss</h1>
        <button
          className="get-started-btn"
          onClick={() => navigate("/booking")}
        >
          Get Started!
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
