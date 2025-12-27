import { useState } from "react";
import api from "../../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const resAPI = await api.post("/auth/login", { email,password });

      localStorage.setItem("token", resAPI.data.token);
      localStorage.setItem("user", JSON.stringify(resAPI.data.user));
  
       const user = resAPI.data.user;
        if(user.forcePasswordChange){
          window.location.href = "/change-password";
          return;
        }
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/employee";
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
