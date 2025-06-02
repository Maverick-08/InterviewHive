import DashboardLayout from "@/layout/DashboardLayout";
import Login from "@/pages/authentication/Login";
import Registration from "@/pages/authentication/Registration";
import ReadInterviewExperience from "@/pages/dashboard/ReadInterviewExperience";
import Landing from "@/pages/landing/Landing";
import {Routes, Route} from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Registration />}/>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<ReadInterviewExperience />}/>
      </Route>
    </Routes>
  )
}

export default AppRoutes
