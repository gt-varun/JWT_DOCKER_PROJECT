import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const API = "https://jwt-docker-project.onrender.com/auth";

const registerUser = async () => {
try {
const res = await axios.post(`${API}/register`, {
email,
password
});


  setMessage(res.data.message || "User registered successfully");
} catch (error) {
  console.error("Error registering user:", error);
  setMessage("Error registering user");
}

};
const loginUser = async () => {
try {
const res = await axios.post(`${API}/login`, {
email,
password
});


  localStorage.setItem("token", res.data.token);
  setMessage("Login successful");
} catch (error) {
  console.error("Login error:", error);
  setMessage("Login failed");
}


};

return ( <div className="container"> <h1>JWT Authentication</h1>


  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <div className="buttons">
    <button onClick={registerUser}>Register</button>
    <button onClick={loginUser}>Login</button>
  </div>

  <p>{message}</p>
</div>


);
}

export default App;
