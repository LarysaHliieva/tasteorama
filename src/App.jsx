import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Loyout from "./components/Loyout/Loyout";
import MainPage from "./pages/MainPage/MainPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage.jsx";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import Own from "./components/Own/Own.jsx";
import Favorites from "./components/Favorites/Favorites.jsx";
import RegisterPage from "./components/AuthComponent/registerPage.jsx";
import LoginPage from "./components/AuthComponent/loginPage.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          error: {
            style: {
              background: "#e04b4bff",
              color: "white",
            },
            // duration: 4000,
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Loyout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route
            path="/add-recipe"
            element={<PrivateRoute component={<AddRecipePage />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={<ProfilePage />} />}
          >
            <Route index element={<Navigate to="own" replace />} />
            <Route path="own" element={<Own />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route
            path="/auth"
            element={<RestrictedRoute component={<AuthPage />} />}
          >
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
