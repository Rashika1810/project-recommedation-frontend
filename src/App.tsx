import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthPage } from "./pages/Auth/Auth";
import CompleteProfilePage from "./pages/Profile/CompleteProfilePage";
import HomePage from "./pages/Home";
import { AuthProvider, useAuth } from "./store/authContext";
import { Toaster } from "react-hot-toast";
import Project from "./pages/Project";
import BookmarksPage from "./pages/Saved";

import About from "./pages/About";
import Course from "./pages/Course";
import ResumeForm from "./pages/ResumeForm";
import ResumeQuestionGenerator from "./pages/ResumeQuestionGenerator";

function App() {
  return (
    <AuthProvider>
      <div className="">
        <Toaster />
        <Routes>
          {/* Root path redirects to /auth */}
          <Route path="/" element={<Navigate to="/auth" replace />} />

          {/* Auth page route */}
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/home"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />

          {/* Layout wrapped routes for authenticated users */}
          <Route
            path="/complete-profile"
            element={
              <Layout>
                <CompleteProfilePage />
              </Layout>
            }
          />

          <Route
            path="/project/:index"
            element={
              <Layout>
                <Project />
              </Layout>
            }
          />
          <Route
            path="/saved"
            element={
              <Layout>
                <BookmarksPage />
              </Layout>
            }
          />
          {/* <Route
            path="/about"
            element={
              <Layout>
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              </Layout>
            }
          /> */}
          <Route
            path="/course"
            element={
              <Layout>
                <Course />
              </Layout>
            }
          />
          <Route
            path="/resume"
            element={
              <Layout>
                <ResumeForm />
              </Layout>
            }
          />
          <Route
            path="/question-generate"
            element={
              <Layout>
                <ResumeQuestionGenerator />
              </Layout>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default App;
