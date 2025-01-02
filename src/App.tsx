import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthPage } from "./pages/Auth/Auth";
import CompleteProfilePage from "./pages/Profile/CompleteProfilePage";
import HomePage from "./pages/Home";
import { AuthProvider, useAuth } from "./store/authContext";

function App() {
  return (
    <AuthProvider>
      <div className="">
        <Layout>
          <Routes>
            {/* Root path redirects to /auth */}
            <Route path="/" element={<Navigate to="/auth" replace />} />

            {/* Auth page route */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Complete Profile page, only accessible if registered */}
            <Route
              path="/complete-profile"
              element={
                <ProtectedRoute>
                  <CompleteProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Home page, only accessible if logged in */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
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
