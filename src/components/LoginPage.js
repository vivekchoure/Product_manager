import React from "react";
import "./../styles/LoginPage.css";

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault(); // Prevents form submission
    window.location.href = "/home"; // Redirects to the home page
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img
          src="https://img.freepik.com/premium-vector/project-management-software-isolated-cartoon-vector-illustrations_107173-30363.jpg"
          alt="Login Illustration"
          className="login-image"
        />
      </div>
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <input type="email" placeholder="Email ID" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="actions">
            <button className="btn-login" onClick={handleLogin}>
              Login
            </button>
            <button type="button" className="btn-google">
              Login with Google
            </button>
          </div>
        </form>
        <div className="register-link">
          New to Logistics? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
