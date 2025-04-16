
import { Link, useLocation } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const location = useLocation();
  
  return (
    <nav className="w-full p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link 
          to="/" 
          className={`text-lg font-medium ${location.pathname === '/' ? 'text-jetson-blue' : 'text-gray-700'}`}
        >
          Main
        </Link>
        <Link 
          to="/reports" 
          className={`text-lg font-medium ${location.pathname === '/reports' ? 'text-jetson-blue' : 'text-gray-700'}`}
        >
          Reports
        </Link>
      </div>
      <Link to="/settings">
        <Button variant="ghost" size="icon" className="text-jetson-blue">
          <Settings className="h-6 w-6" />
        </Button>
      </Link>
    </nav>
  );
};

export default NavBar;
