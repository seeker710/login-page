import Login from "./components/Lognin";
import Signin from "./components/Signin";
import Homepage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="*" element={<h1>404 Page not found</h1>} />
    </Routes>
  );
}

export default App;
