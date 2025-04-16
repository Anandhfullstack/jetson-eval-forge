
import { Button } from "@/components/ui/button";

interface BenchmarkButtonProps {
  onClick: () => void;
}

const BenchmarkButton = ({ onClick }: BenchmarkButtonProps) => {
  return (
    <Button 
      className="bg-jetson-purple hover:bg-jetson-purple/90 text-white font-medium px-6 py-2 btn-vibrant"
      onClick={onClick}
    >
      Run Benchmark
    </Button>
  );
};

export default BenchmarkButton;

