import Login from "@/pages/authentication/Login";
import Landing from "@/pages/landing/Landing";
import {Routes, Route} from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
  )
}

export default AppRoutes
