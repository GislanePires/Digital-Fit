import React from "react";
import { ThemeContextProvider } from "./context/ThemeContext";
// import Login from "./pages/Login";
// import UserPage from "./pages/UserPage";
import Register from "./pages/Register";
// import Home from "./pages/Home"

function App() {
  return (
    <ThemeContextProvider>
      {/* <Login /> */}
      {/* <UserPage /> */}
      <Register />
      {/* <Home /> */}
    </ThemeContextProvider>
  );
}

export default App;
