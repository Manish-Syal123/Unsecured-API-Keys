import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/Pages/Home";
import Navbar from "./components/Pages/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
