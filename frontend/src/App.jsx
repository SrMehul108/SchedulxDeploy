import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { lazy, Suspense, useRef } from "react";
// Auth Pages
const Registration = lazy(() => import("./pages/auth/registration/Registration"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const OtpPage = lazy(() => import("./components/auth/Otp"));
const ConfirmPassword = lazy(() => import("./components/auth/ConfirmPassword"));
const LoginForm = lazy(() => import("./pages/auth/Login"));
const AccountSidebar = lazy(() => import("./pages/auth/AccountSidebar/AccountSidebar"));

// Dashboard & Layout
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));

// User Pages
const EditProfile = lazy(() => import("./components/EditProfile/EditProfile"));
const Publish = lazy(() => import("./pages/user/publish/publish"));
const Analyze = lazy(() => import("./pages/user/Analyze/Analyze"));
const Preference = lazy(() => import("./pages/user/Preference/Preference"));
const Channel = lazy(() => import("./pages/user/Profile/Channel/Channel"));
const ManagePage = lazy(() => import("./pages/user/Profile/MangePage/ManagePage"));
const ReferAFriend = lazy(() => import("./pages/user/Profile/RefereAFriend/RefereAFriend"));
const BetaFeatures = lazy(() => import("./pages/user/Profile/BetaFeatures/BetaFeatures"));

// Analyze Components
const AnalyzeDashboard = lazy(() => import("./components/Analyze/AnalyzeDashboard/AnalyzeDashboard"));
const AnalyzeTags = lazy(() => import("./components/Analyze/AnalyzeTags/AnalyzeTags"));

// Miscellaneous
const ComingSoon = lazy(() => import("./components/CommingSoon/CommingSoon"));
const Tags = lazy(() => import("./components/Calendar/Tags/Tags"));

// User Settings
const General = lazy(() => import("./components/User/General/General"));
const Security = lazy(() => import("./components/User/Security/Security"));
const Notification = lazy(() => import("./components/User/Notification/Notification"));
const AppsExtra = lazy(() => import("./components/User/AppsExtra/AppsExtra"));
const Account = lazy(() => import("./components/User/Account/Account"));
const Organization = lazy(() => import("./components/User/Organization/Organization"));

// Protected Route
// Protected Route
const ProtectedRoute = lazy(() => import("./context/ProtectedRoute"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Totals = lazy(() => import("./components/Analyze/Totals/Totals"));
const NotificationHandler = lazy(() => import("./components/NotificationHandler/NotificationHandler"));
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Icons } from "../src/constants/icons";
import Loading from "./components/loader/loader";
import api from "./apis/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [theme, setTheme] = useState("light");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  const facebookCalled = useRef(false);
  const linkedinCalled = useRef(false);
  const twitterCalled = useRef(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (isThemeLoaded) {
      document.documentElement.className = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme, isThemeLoaded]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const twitter = queryParams.get("twitter");
    const linkedin = queryParams.get("linkedin");
    const accessToken = queryParams.get("accessToken");
    const facebook = queryParams.get("facebook");
    if (facebook && !facebookCalled.current) {
      facebookCalled.current = true;
      try {
        const parsedUser = JSON.parse(decodeURIComponent(facebook));
        setUserData(parsedUser);
        api
          .post(
            "/api/v1/facebook/facebook-add",
            {
              socialMediaID: parsedUser.id,
              accessToken: parsedUser.accessToken,
              platformUserName: parsedUser.displayName,
              displayName: parsedUser.displayName,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {

            const newUrl = `${window.location.origin}/publish`;
            window.history.replaceState(null, "", newUrl);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            setError(
              error.response?.data?.ErrorMessage || "Failed to save user data"
            );
          });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Failed to parse user data");
      }
    } else {
      console.warn("No user parameter found in the URL.");
    }
    if (linkedin && !linkedinCalled.current) {
      linkedinCalled.current = true;

      try {
        const parsedUser = JSON.parse(decodeURIComponent(linkedin));
        setUserData(parsedUser);
        api
          .post(
            "/api/v1/linkedin/linkedin-add",
            {
              sub: parsedUser.sub,
              accessToken: accessToken,
              socialMediaEmail: parsedUser.email,
              platformUserName: parsedUser.name,
              name: parsedUser.name,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {

            const newUrl = `${window.location.origin}/publish`;
            window.history.replaceState(null, "", newUrl);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            setError(
              error.response?.data?.ErrorMessage || "Failed to save user data"
            );
          });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Failed to parse user data");
      }
    } else {
      console.warn("No user parameter found in the URL.");
    }
    if (twitter && !twitterCalled.current) {
      twitterCalled.current = true; // Mark Twitter API as calledif (twitter) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(twitter));
        setUserData(parsedUser);
        api
          .post(
            "/api/v1/twitter/twitter-add",
            {
              accessToken: parsedUser.accessToken,
              accessSecret: parsedUser.accessSecret,
              displayName: parsedUser.displayName,
              socialMediaID: parsedUser.id,
              platformUserName: parsedUser.username,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {

            const newUrl = `${window.location.origin}/publish`;
            window.history.replaceState(null, "", newUrl);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            setError(
              error.response?.data?.ErrorMessage || "Failed to save user data"
            );
          });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Failed to parse user data");
      }
    } else {
      console.warn("No user parameter found in the URL.");
    }
  }, [location.search]);

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 flex items-center gap-2 px-3 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full z-[999999]"
      >
        {theme === "light" ? (
          <>
            <span>{Icons.suN}</span>
          </>
        ) : (
          <>
            <span>{Icons.MooN}</span>
          </>
        )}
      </button>

      <ToastContainer />
      <NotificationHandler />
      <DashboardLayout />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/publish" /> : <LoginForm />}
          />
          <Route
            path="/registration"
            element={isAuthenticated ? <Navigate to="/" /> : <Registration />}
          />
          <Route
            path="/forget-password"
            element={isAuthenticated ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route
            path="/otp"
            element={isAuthenticated ? <Navigate to="/" /> : <OtpPage />}
          />
          <Route
            path="/confirm-password"
            element={isAuthenticated ? <Navigate to="/" /> : <ConfirmPassword />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/publish" /> : <LandingPage />}
          />

          <Route
            path="/create"
            element={<ProtectedRoute element={<ComingSoon />} />}
          />
          <Route
            path="/engage"
            element={<ProtectedRoute element={<ComingSoon />} />}
          />
          <Route
            path="/startpage"
            element={<ProtectedRoute element={<ComingSoon />} />}
          />
          <Route
            path="/editprofile"
            element={<ProtectedRoute element={<EditProfile />} />}
          />

          <Route
            path="/publish"
            element={<ProtectedRoute element={<Publish />} />}
          >
            <Route path="tags" element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute element={<Tags />} />
              </Suspense>
            } />
          </Route>

          <Route
            path="/analyze"
            element={<ProtectedRoute element={<Analyze />} />}
          >
            <Route
              path="home"
              element={<ProtectedRoute element={<AnalyzeDashboard />} />}
            />
            <Route
              path="facebook"
              element={<ProtectedRoute element={<AnalyzeDashboard />} />}
            />
            <Route
              path="instagram"
              element={<ProtectedRoute element={<AnalyzeDashboard />} />}
            />
            <Route
              path="xtwitter"
              element={<ProtectedRoute element={<AnalyzeDashboard />} />}
            />
            <Route
              path="linkedin"
              element={<ProtectedRoute element={<AnalyzeDashboard />} />}
            />
            <Route
              path="tags"
              element={<ProtectedRoute element={<AnalyzeTags />} />}
            />
            <Route
              path="reports"
              element={<ProtectedRoute element={<AnalyzeDashboard />} />}
            />
          </Route>

          <Route
            path="/account"
            element={<ProtectedRoute element={<AccountSidebar />} />}
          >
            <Route
              path="accountdetail"
              element={<ProtectedRoute element={<Account />} />}
            />
            <Route
              path="channels"
              element={<ProtectedRoute element={<Channel />} />}
            />
            <Route
              path="organization"
              element={<ProtectedRoute element={<Organization />} />}
            />
            <Route
              path="betafeatures"
              element={<ProtectedRoute element={<BetaFeatures />} />}
            />
            <Route
              path="referafriend"
              element={<ProtectedRoute element={<ReferAFriend />} />}
            />
          </Route>

          <Route
            path="/channel"
            element={<ProtectedRoute element={<Channel />} />}
          />
          <Route
            path="/manageteam"
            element={<ProtectedRoute element={<ManagePage />} />}
          />
          <Route
            path="/referafriend"
            element={<ProtectedRoute element={<ReferAFriend />} />}
          />
          <Route
            path="/betafeatures"
            element={<ProtectedRoute element={<BetaFeatures />} />}
          />

          <Route
            path="/preference"
            element={<ProtectedRoute element={<Preference />} />}
          >
            <Route
              path="general"
              element={<ProtectedRoute element={<Notification />} />}
            />
            <Route
              path="security"
              element={<ProtectedRoute element={<Security />} />}
            />
            <Route
              path="notifications"
              element={<ProtectedRoute element={<Notification />} />}
            />
            <Route
              path="appsextras"
              element={<ProtectedRoute element={<Security />} />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
