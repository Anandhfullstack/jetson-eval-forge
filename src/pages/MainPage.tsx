import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import SearchBar from "@/components/main/SearchBar";
import ModelCard from "@/components/main/ModelCard";
import { useModelData } from "@/contexts/ModelDataContext";
import BenchmarkButton from "@/components/main/BenchmarkButton";
import BenchmarkModal from "@/components/main/BenchmarkModal";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { models } = useModelData();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStartBenchmark = (formValues: any) => {
    console.log("Starting benchmark with values:", formValues);
    // Implement benchmark logic here
  };

  const filteredModels = models.filter(model => 
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">LLM Model Evaluation</h1>
          <div className="w-full max-w-md">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        
        <div className="flex flex-col items-center py-6">
          <div className="mb-2 text-center max-w-lg">
            <p className="text-gray-600 mb-6">
              Run benchmarks across all configured LLM models to compare their performance metrics.
            </p>
          </div>
          <BenchmarkButton onClick={() => setModalOpen(true)} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <ModelCard
                key={model.id}
                id={model.id}
                name={model.name}
                version={model.version}
                lastRun={model.lastRun}
              />
            ))}
          </div>
        </div>

        <BenchmarkModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSubmit={handleStartBenchmark}
        />
      </div>
    </AppLayout>
  );
};

export default MainPage;
