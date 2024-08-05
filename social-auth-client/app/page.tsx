import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Social Auth with Next.js</h1>
      <GoogleLoginButton />
    </div>
  );
};

export default Home;
