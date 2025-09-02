import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

import { FadeLoader } from "react-spinners";

import "./App.css";
import Loyout from "./components/Loyout/Loyout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const RecipeDetailsPage = lazy(() =>
  import("./pages/RecipeDetailsPage/RecipeDetailsPage")
);
const AddRecipePage = lazy(() => import("./pages/AddRecipePage/AddRecipePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
const Own = lazy(() => import("./components/Own/Own"));
const Favorites = lazy(() => import("./components/Favorites/Favorites"));
const RegisterPage = lazy(() =>
  import("./components/AuthComponent/registerPage")
);
const LoginPage = lazy(() => import("./components/AuthComponent/loginPage"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          error: {
            style: { background: "#e04b4bff", color: "white" },
            duration: 1500,
          },
          success: {
            style: { background: "#70a360ff", color: "white" },
            duration: 1500,
          },
        }}
      />

      <Suspense fallback={<FadeLoader color="#9B6C43" />}>
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
              <Route index element={<Navigate to="login" replace />} />
              <Route
                index
                path="login"
                element={
                  <Suspense fallback={<FadeLoader color="#9B6C43" />}>
                    <LoginPage />
                  </Suspense>
                }
              />
              <Route
                path="register"
                element={
                  <Suspense fallback={<FadeLoader color="#9B6C43" />}>
                    <RegisterPage />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="*"
              element={
                <Suspense fallback={<FadeLoader color="#9B6C43" />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
