import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import DashboardNew from "./pages/DashboardNew"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardNew />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}