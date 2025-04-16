
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import SearchBar from "@/components/main/SearchBar";
import { CardReport } from "@/components/ui/card-report";
import ModelCard from "@/components/main/ModelCard";
import { useModelData } from "@/contexts/ModelDataContext";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { models } = useModelData();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleRunBenchmark = () => {
    console.log("Running benchmark...");
    // Implement benchmark logic here
  };

  const owenModel = models.find(model => model.name === 'Owen');
  const llamaModel = models.find(model => model.name === 'Llama');

  return (
    <AppLayout>
        <div className="flex flex-col items-center mb-8">
          <div className="w-full max-w-md mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          <Button 
            className="bg-jetson-blue hover:bg-blue-600 text-white font-medium"
            onClick={handleRunBenchmark}
          >
            Run Benchmark
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              id={model.id}
              name={model.name}
              version={model.version}
              lastRun={model.lastRun}
            />
          ))}
        </div>
      </AppLayout>
  );
};

export default MainPage;
