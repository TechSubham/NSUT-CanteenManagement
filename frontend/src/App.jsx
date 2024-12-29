import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage/page";
import PrivateRoute from "./contexts/authContext/PrivateRoute";
import Beverages from "./Pages/Food/Beverages/Beverages";
import Meal from "./Pages/Food/Meal/Meal";
import Snacks from "./Pages/Food/Snacks/Snacks";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/homepage"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/Food/Beverages"
            element={
              <PrivateRoute>
                <Beverages />
              </PrivateRoute>
            }
          />
          <Route
            path="/Food/Meal"
            element={
              <PrivateRoute>
                <Meal />
              </PrivateRoute>
            }
          />
          <Route
            path="/Food/Snacks"
            element={
              <PrivateRoute>
                <Snacks />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
