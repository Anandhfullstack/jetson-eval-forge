
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ChevronRight, Calendar } from "lucide-react";

interface ModelCardProps {
  id: string;
  name: string;
  version: string;
  lastRun: string;
}

const ModelCard = ({ id, name, version, lastRun }: ModelCardProps) => {
  const formattedDate = format(new Date(lastRun), "MMM dd, yyyy");
  
  return (
    <Link to="/reports" state={{ modelId: id }} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:border-jetson-blue/50 h-full">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-jetson-blue transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500">Version {version}</p>
            </div>
            <span className="bg-jetson-purple/10 text-jetson-purple px-2 py-1 rounded text-xs font-medium">
              LLM
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            View performance metrics and comprehensive evaluation reports for this model.
          </p>
          
          <div className="flex items-center text-sm text-gray-500 mt-4">
            <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>Last run: {formattedDate}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm font-medium text-jetson-blue">View Reports</span>
          <ChevronRight className="h-4 w-4 text-jetson-blue transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ModelCard;
