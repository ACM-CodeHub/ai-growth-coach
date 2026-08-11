import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
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

            <Route path="/dashboard" 
            element={
            <DashboardLayout>
            <Dashboard/>
            </DashboardLayout>
            }
            />


            <Route path="/submit-code" 
            element={
            <DashboardLayout>
            <SubmitCode/>
            </DashboardLayout>
            }
            />


            <Route path="/ai-review" 
            element={
            <DashboardLayout>
            <AIReview/>
            </DashboardLayout>
            }
            />


            <Route path="/history" 
            element={
            <DashboardLayout>
            <History/>
            </DashboardLayout>
            }
            />


            <Route path="/growth-report" 
            element={
            <DashboardLayout>
            <GrowthReport/>
            </DashboardLayout>
            }
            />
            
          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}


export default App;