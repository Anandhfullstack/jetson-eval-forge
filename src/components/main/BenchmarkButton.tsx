
import { Button } from "@/components/ui/button";

interface BenchmarkButtonProps {
  onClick: () => void;
}

const BenchmarkButton = ({ onClick }: BenchmarkButtonProps) => {
  return (
    <Button 
      className="bg-jetson-blue hover:bg-blue-600 text-white font-medium px-6 py-2"
      onClick={onClick}
    >
      Run Benchmark
    </Button>
  );
};

export default BenchmarkButton;
