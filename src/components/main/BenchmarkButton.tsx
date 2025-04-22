import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface BenchmarkButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const BenchmarkButton = ({ onClick, disabled }: BenchmarkButtonProps) => {
  return (
    <Button 
      className="bg-gradient-to-r from-jetson-blue to-jetson-purple hover:opacity-90 text-white font-medium px-6 py-6 h-auto rounded-lg shadow-md transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
      onClick={onClick}
      disabled={disabled}
    >
      <Play className="w-5 h-5 mr-2 stroke-[2.5px]" />
      {disabled ? "Running..." : "Run Benchmark"}
    </Button>
  );
};

export default BenchmarkButton;
