import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { Auth0Provider } from "@auth0/auth0-react";
// const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;
// const domain = import.meta.env.VITE_OAUTH_DOMAIN;
// const redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URI

const App = () => {
  return (
    <div>
      <Toaster richColors className="font-mono" />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      {/* <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: redirectUri,
        }}
      >
        <Toaster richColors className="font-mono" />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Auth0Provider> */}
    </div>
  );
};

export default App;
