import Login from "@/pages/authentication/Login";
import Registration from "@/pages/authentication/Registration";
import ShareInterviewExperience from "@/pages/dashboard/ShareInterviewExperience";
import BookmarkedInterviews from "@/pages/dashboard/BookmarkedInterviews";
import Dashboard from "@/pages/dashboard/Dashboard";
import Landing from "@/pages/landing/Landing";
import Profile from "@/pages/profile/Profile";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookmark" element={<BookmarkedInterviews />} />
      <Route path="/share" element={<ShareInterviewExperience />} />
      <Route path="/profile/*" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
