import { Route, Routes } from "react-router";

import SignupPage from "./pages/SignupPage.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verification" element={<VerificationPage />} />
      </Routes>
    </>
  );
};

export default App;
