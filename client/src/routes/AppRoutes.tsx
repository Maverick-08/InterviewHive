import Login from "@/pages/authentication/Login";
import Registration from "@/pages/authentication/Registration";
import Landing from "@/pages/landing/Landing";
import {Routes, Route} from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Registration />}/>
    </Routes>
  )
}

export default AppRoutes
