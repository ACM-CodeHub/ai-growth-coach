import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AIReview from "./pages/AIReview";
import History from "./pages/History";
import GrowthReport from "./pages/GrowthReport";
import SubmitCode from "./pages/SubmitCode";
import LandingPage from "./pages/LandingPage";

function App() {

  return (
    <BrowserRouter>

      

      <div style={{ display: "flex" }}>

        

        <main style={{ padding: "20px", flex: 1 }}>

          <Routes>

            <Route path="/" element={<LandingPage/>} />
            
            <Route path="/register" element={<Register />} />
            
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />

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