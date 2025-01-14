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
import { CartProvider } from './contexts/CartContext';
import Cart from './Pages/Cart/Cart';
import SavedItems from "./Pages/Saved/SavedItems";

const App = () => {
  return (
    <CartProvider>

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
            <Route
              path="/saved-items"
              element={
                <PrivateRoute>
                  <SavedItems/>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
      </AuthProvider>
    </Router>
    </CartProvider>
  );
};

export default App;
