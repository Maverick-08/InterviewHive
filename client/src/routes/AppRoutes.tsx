import Login from "@/pages/authentication/Login";
import Registration from "@/pages/authentication/Registration";
import ShareInterviewExperience from "@/pages/dashboard/ShareInterviewExperience";
import BookmarkedInterviews from "@/pages/dashboard/BookmarkedInterviews";
import Dashboard from "@/pages/dashboard/Dashboard";
import Landing from "@/pages/landing/Landing";
import Profile from "@/pages/profile/Profile";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import EditInterview from "@/pages/dashboard/EditInterview";
import MockInterview from "@/pages/mockInterview/MockInterview";
import Chat from "@/pages/connect/Chat";
import UserProfile from "@/pages/profile/UserProfile";
import ResetPassword from "@/pages/authentication/ResetPassword";
import Reset from "@/pages/authentication/Reset";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/reset-password/:secretToken/:userId" element={<ResetPassword />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookmark" element={<BookmarkedInterviews />} />
        <Route path="/share" element={<ShareInterviewExperience />} />
        <Route path="/connect" element={<Chat />} />
        <Route path="/prepare" element={<MockInterview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/edit/:interviewId" element={<EditInterview />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
