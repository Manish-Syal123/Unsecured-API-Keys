import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/Pages/Home";
import Navbar from "./components/Pages/Navbar";
import { KeysContext } from "./context/KeysContext";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  // TODO: will call the keys/getall endpoint and store its detail in the context, so that it can accessable to generate random key as well as in the footer.
  const [allKeysData, setAllKeysData] = useState([]);
  const [allProviders, setAllProviders] = useState([]);

  useEffect(() => {
    fetchAllKeys();
    fetchAllProviders();
  }, []);

  const fetchAllKeys = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_BACE_URL}/keys/getall`
      );
      if (response.status === 200) {
        setAllKeysData(response.data);
        console.log("Keys fetched successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching keys:", error);
    }
  };
  const fetchAllProviders = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_BACE_URL}/providers`
      );
      if (response.status === 200) {
        setAllProviders(response.data);
        console.log("Providers fetched successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };
  return (
    <Router>
      <Navbar />
      <KeysContext.Provider value={{ allKeysData, allProviders }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </KeysContext.Provider>
    </Router>
  );
}

export default App;
