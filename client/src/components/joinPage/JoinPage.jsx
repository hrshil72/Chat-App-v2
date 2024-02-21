import React, { useState } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  background-color: #201c1c;
`;

const Container = styled.div`
  width: 40vw;
  height: 80vh;
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.div`
  font-size: 2vw;
  color: white;
  margin-bottom: 40px;
`;
let user;
const JoinPage = () => {
  let [name, setName] = useState("");

  const handleSendUser = () => {
    user = document.getElementById("input").value;
  };

  return (
    <Wrapper>
      <Container>
        <img style={{ width: "20vw", height: "20vw" }} src={logo} />
        <Heading>Lets Chat</Heading>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "20px 10px", width: "20vw" }}
          type="text"
          id="input"
          placeholder="Enter you Name"></input>

        <Link
          onClick={(e) => {
            name === "" ? e.preventDefault() : null;
          }}
          to="/chat">
          <Button
            onClick={handleSendUser}
            style={{
              marginTop: "30px",
              backgroundColor: "#DE0F3F",
              padding: "15px 30px",
            }}
            variant="contained">
            Login
          </Button>
        </Link>
      </Container>
    </Wrapper>
  );
};

export default JoinPage;
export { user };
