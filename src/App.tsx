import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthPage } from "./Components/Auth/Auth";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import HomePage from "./pages/Home"; // Your Home page
import { useAuth, AuthProvider } from "./store/authContext"; // Import auth context

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="text-red-300">
          <Layout>
            <Routes>
              {/* Root path redirects to /auth */}
              <Route path="/" element={<Navigate to="/auth" replace />} />

              {/* Auth page route */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Complete Profile page, only accessible if registered */}
              <Route path="/complete-profile" element={<ProtectedRoute />} />

              {/* Home page, only accessible if logged in */}
              <Route path="/home" element={<HomeRoute />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Protected route for complete profile
const ProtectedRoute = () => {
  const { isRegistered, isLoggedIn } = useAuth();
  // Navigate to /auth if not logged in or registered
  if (!isLoggedIn || !isRegistered) {
    return <Navigate to="/auth" replace />;
  }
  return <CompleteProfilePage />;
};

// Home route accessible after successful login
const HomeRoute = () => {
  const { isLoggedIn } = useAuth();
  // Navigate to /auth if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  return <HomePage />;
};

export default App;
