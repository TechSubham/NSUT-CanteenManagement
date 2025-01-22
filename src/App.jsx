import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Login from "./Pages/Login.jsx";
import StatsPage from "./Pages/Stats/page.jsx";
import HomePage from "./Pages/HomePage/page.jsx";
import PrivateRoute from "./contexts/authContext/PrivateRoute";
import Beverages from "./Pages/Food/Beverages/Beverages.jsx";
import Meal from "./Pages/Food/Meal/Meal.jsx";
import Snacks from "./Pages/Food/Snacks/Snacks.jsx";
import { CartProvider } from './contexts/CartContext';
import Cart from './Pages/Cart/Cart.jsx';
import SavedItems from "./Pages/Saved/SavedItems.jsx";
import ContactUs from "./Pages/ContactUs/ContactUs.jsx";
import StudentStats from "./Pages/Stats/page.jsx"
import { useEffect } from "react";
import { setupNotifications, setupMessageListener } from './firebase/firebase';


const App = () => {
  useEffect(() => {
    setupNotifications()
      .then(() => console.log('Notifications setup complete'))
      .catch(error => console.error('Notifications setup failed:', error));
    
    setupMessageListener();
  }, []);
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
              path="/statspage"
              element={
                <PrivateRoute>
                  <StatsPage/>
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
            <Route
              path="/contact-us"
              element={
                <PrivateRoute>
                  <ContactUs/>
                </PrivateRoute>
              }
            />
            <Route
              path="/Stats"
              element={
                <PrivateRoute>
                  <StudentStats/>
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
