import { Route, Routes } from "react-router";

import SignupPage from "./pages/SignupPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
