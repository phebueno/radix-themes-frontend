import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsLinks from "./pages/NewsLinks";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/themes/:id" element={<NewsLinks />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
