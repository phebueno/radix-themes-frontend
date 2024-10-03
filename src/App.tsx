import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsLinks from "./pages/NewsLinks";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/themes/:id" element={<NewsLinks />} />
      </Routes>
    </Router>
  );
}

export default App;
