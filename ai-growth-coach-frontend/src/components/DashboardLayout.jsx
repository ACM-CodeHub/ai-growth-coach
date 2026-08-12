import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import "../App.css";


const DashboardLayout = ({ children }) => {

  const [showSidebar, setShowSidebar] = useState(true);


  return (

    <div className="dashboard-layout">


      <button
        className="menu-toggle"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu size={25}/>
      </button>



      {showSidebar && <Sidebar />}



      <main className="dashboard-content">

        {children}

      </main>



    </div>

  );
};


export default DashboardLayout;