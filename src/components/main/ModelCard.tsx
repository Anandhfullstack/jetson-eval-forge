
import { Link } from "react-router-dom";
import { CardReport } from "@/components/ui/card-report";

interface ModelCardProps {
  id: string;
  name: string;
  version: string;
  lastRun: string;
}

const ModelCard = ({ id, name, version, lastRun }: ModelCardProps) => {
  return (
    <Link to="/reports" className="block" state={{ modelId: id }}>
      <CardReport title={`${name} ${version} Evaluation reports`}>
        <p className="text-center text-gray-700 mb-2">
          View performance metrics and evaluation reports
        </p>
        <p className="text-sm text-gray-500">
          Last benchmark: {new Date(lastRun).toLocaleDateString()}
        </p>
      </CardReport>
    </Link>
  );
};

export default ModelCard;
