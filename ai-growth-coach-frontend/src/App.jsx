import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AIReview from "./pages/AIReview";
import History from "./pages/History";
import GrowthReport from "./pages/GrowthReport";
import SubmitCode from "./pages/SubmitCode";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <div style={{ display: "flex" }}>

        <Sidebar />

        <main style={{ padding: "20px", flex: 1 }}>

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/submit-code" element={<SubmitCode />} />

            <Route path="/ai-review" element={<AIReview />} />

            <Route path="/history" element={<History />} />

            <Route path="/growth-report" element={<GrowthReport />} />
            
          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}


export default App;