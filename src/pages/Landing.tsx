import React from "react";

const Landing = () => {
  console.log("Landing component is rendering - simple version");
  
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <h1 style={{ color: "#333", fontSize: "2rem" }}>MCPGuard Landing Page</h1>
      <p style={{ color: "#666", fontSize: "1.2rem" }}>This is a simple test to see if the component renders.</p>
      <a href="/dashboard" style={{ color: "blue", textDecoration: "underline" }}>Go to Dashboard</a>
    </div>
  );
};

export default Landing;