import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsLinks from "./pages/NewsLinks";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
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
