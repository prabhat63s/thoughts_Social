import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationPage from "./pages/notification/NotificationPage";
import About from "./pages/About";
import Message from "./pages/Message";
import Explore from "./pages/Explore";
import TermsOfUse from "./components/common/TermsOfUse";
import FAQ from "./components/common/FAQ";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-white bg-gradient-to-bl from-neutral-950 to-neutral-700 tracking-wide">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/about"
          element={authUser ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="/message"
          element={authUser ? <Message /> : <Navigate to="/login" />}
        />
        <Route
          path="/explore"
          element={authUser ? <Explore /> : <Navigate to="/login" />}
        />
        <Route
          path="/terms-of-use"
          element={authUser ? <TermsOfUse /> : <Navigate to="/login" />}
        />
        <Route
          path="/faq"
          element={authUser ? <FAQ /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
