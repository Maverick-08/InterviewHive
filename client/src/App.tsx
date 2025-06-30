import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
const OAuthId = import.meta.env.VITE_OAUTH_CLIENT_ID

const App = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId={OAuthId}>
        <Toaster richColors className="font-mono" />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
