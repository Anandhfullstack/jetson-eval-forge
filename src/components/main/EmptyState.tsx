
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white/50">
      <div className="p-3 bg-blue-100 rounded-full mb-4">
        <BarChart3 className="h-8 w-8 text-jetson-blue" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{description}</p>
      <Button onClick={onAction}>{actionLabel}</Button>
    </div>
  );
};

export default EmptyState;
