import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Loyout from "./components/Loyout/Loyout";
import MainPage from "./pages/MainPage/MainPage";
import RecipeViewPage from "./pages/RecipeViewPage/RecipeViewPage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loyout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipes/:id" element={<RecipeViewPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="own" element={<>own</>} />
            <Route path="favorites" element={<>favorites</>} />
          </Route>
          <Route path="/auth" element={<AuthPage />}>
            <Route path="register" element={<>register</>} />
            <Route path="login" element={<>login</>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
