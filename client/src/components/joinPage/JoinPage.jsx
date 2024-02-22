import React, { useState } from "react";
import { Button } from "@mui/material";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

let user;
const JoinPage = () => {
  let [name, setName] = useState("");

  const handleSendUser = () => {
    user = document.getElementById("joinInput").value;
  };

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} />
        <h1>Lets Chat</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="joinInput"
          placeholder="Enter you Name"></input>

        <Link
          onClick={(e) => {
            name === "" ? e.preventDefault() : null;
          }}
          to="/chat">
          <button onClick={handleSendUser} className="joinbtn">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinPage;
export { user };
