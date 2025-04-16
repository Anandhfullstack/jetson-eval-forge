
import { Link, useLocation } from "react-router-dom";
import { Settings, BarChart3, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const location = useLocation();
  
  return (
    <nav className="w-full py-4 px-6 bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-8 text-xl font-bold text-gray-800">
            Jetson<span className="text-jetson-blue">LLM</span>
          </div>
          <div className="hidden md:flex space-x-1">
            <NavLink to="/" active={location.pathname === '/'}>
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </NavLink>
            <NavLink to="/reports" active={location.pathname === '/reports'}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
            </NavLink>
          </div>
        </div>
        <Link to="/settings">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-200 hover:bg-gray-50">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => (
  <Link 
    to={to} 
    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      active 
        ? 'bg-gray-100 text-jetson-blue' 
        : 'text-gray-700 hover:bg-gray-50 hover:text-jetson-blue'
    }`}
  >
    {children}
  </Link>
);

export default NavBar;
