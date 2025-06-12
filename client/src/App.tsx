import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Toaster richColors className="font-mono"/>
      <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </div>
  )
}

export default App
