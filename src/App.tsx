import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthPage } from "./pages/Auth/Auth";
import CompleteProfilePage from "./pages/Profile/CompleteProfilePage";
import HomePage from "./pages/Home";
import { AuthProvider, useAuth } from "./store/authContext";
import { Toaster } from "react-hot-toast";
import Project from "./pages/Project";
import BookmarksPage from "./pages/Saved";

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

          {/* Layout wrapped routes for authenticated users */}
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <CompleteProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/project/:index"
            element={
              <Layout>
                <ProtectedRoute>
                  <Project />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/saved"
            element={
              <Layout>
                <ProtectedRoute>
                  <BookmarksPage />
                </ProtectedRoute>
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
