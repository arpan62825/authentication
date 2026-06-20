import { Route, Routes } from "react-router";

import SignupPage from "./pages/SignupPage.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification" element={<VerificationPage />} />
      </Routes>
    </>
  );
};

export default App;
