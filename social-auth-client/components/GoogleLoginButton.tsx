// indique à Next.js que ce composant doit être rendu côté client.
"use client";
// src/components/GoogleLoginButton.tsx
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton: React.FC = () => {
  const handleSuccess = (credentialResponse: any) => {
    console.log("Google login success:", credentialResponse);
    // Traitez la réponse, par exemple, envoyez les données au backend pour la validation et l'authentification
  };

  const handleError = () => {
    console.error("Google login failed");

    // Gérez les erreurs de connexion, par exemple afficher un message d'erreur à l'utilisateur
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          // Optionnellement, personnalisez l'apparence du bouton avec children ou d'autres props
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
