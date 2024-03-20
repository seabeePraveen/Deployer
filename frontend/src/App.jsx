import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ImportURL from "./components/ImportURL/ImportURL.jsx";
import Deploy from "./components/Deploy/Deploy.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/import" element={<ImportURL />} />
        <Route path="/deploy" element={<Deploy />} />
      </Routes>
    </Router>
  );
}

export default App
