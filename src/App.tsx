import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import theme from "./theme";
import AuthContextProvider from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
