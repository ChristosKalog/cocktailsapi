import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import RecipeList from "./pages/recipes/RecipeList";
import RecipeDetail from "./pages/recipes/RecipeDetail";
import AddRecipe from "./pages/recipes/AddRecipe";
import CreateMenu from "./pages/menu/CreateMenu";
import ViewMenu from "./pages/menu/ViewMenu";
import Profile from "./pages/profile/Profile";
// import EditRecipe from "./pages/recipes/EditRecipe";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import Settings from "./pages/settings/Settings";

// Common components
import PrivateRoute from "./components/common/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  if (navigator.userAgent.indexOf("Win") !== -1) {
  } else if (navigator.userAgent.indexOf("Mac") !== -1) {
  } else if (navigator.userAgent.indexOf("Linux") !== -1) {
  }

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
      <Router>
    <AuthProvider>
        <div className="App">
          <Navbar />
          <main>
            <Routes>        
            <Route path="/recipe/add" element={ <PrivateRoute> <AddRecipe /></PrivateRoute>} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

              {/* Private Routes - Require Authentication */}

              <Route path="/" element={ <PrivateRoute> <Dashboard /></PrivateRoute>} />
              <Route path="/recipes" element={<PrivateRoute><RecipeList /></PrivateRoute>} />
              <Route path="/recipes/:id"  element={<PrivateRoute><RecipeDetail /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile />   </PrivateRoute>} />
              <Route path="/menu/create" element={<PrivateRoute><CreateMenu /></PrivateRoute>} />
              <Route path="/viewmenu/:id" element={<PrivateRoute><ViewMenu /></PrivateRoute>} />
              <Route path="/recipe/add" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
              {/* <Route path="/recipe/edit" element={<PrivateRoute><EditRecipe /></PrivateRoute>} /> */}
              
            </Routes>
          </main>

          <Footer />
        </div>
    </AuthProvider>
      </Router>
  );
}

export default App;
