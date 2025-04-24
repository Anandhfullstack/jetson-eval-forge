// src/pages/MainPage.tsx
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import SearchBar from "@/components/main/SearchBar";
import ModelCard from "@/components/main/ModelCard";
import { useModelData } from "@/contexts/ModelDataContext";
import BenchmarkButton from "@/components/main/BenchmarkButton";
import BenchmarkModal from "@/components/main/BenchmarkModal";

// Define FormValues type directly - matching curl command format
type FormValues = {
  model: string;
  maxCompletedRequests: number;
  requestIntervalGeneratorType: "gamma" | "poisson" | "uniform"; // Changed from requestIntervalType
  requestLengthGeneratorType: "zipf" | "uniform" | "fixed";      // Changed from requestLengthType
  maxTokens: number;
};

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  

  // NEW: track whether a benchmark is in flight
  const [loading, setLoading] = useState(false);
  // NEW: store the latest results JSON
  const [results, setResults] = useState<any>(null);

  const { models } = useModelData();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // UPDATED: async function that POSTS to match curl command format
  const handleStartBenchmark = async (formValues: FormValues) => {
    setLoading(true);
    setResults(null);
    
    // Convert form values to match the curl command format
    const requestData = {
      model: formValues.model,
      maxCompletedRequests: formValues.maxCompletedRequests,
      requestIntervalGeneratorType: formValues.requestIntervalGeneratorType,
      requestLengthGeneratorType: formValues.requestLengthGeneratorType,
      maxTokens: formValues.maxTokens
    };
    
    try {
      console.log("Sending request:", JSON.stringify(requestData, null, 2));
      
      const res = await fetch("http://localhost:3000/benchmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      
      // Log response status and headers
      console.log("Response status:", res.status);
      console.log("Response headers:", Object.fromEntries([...res.headers.entries()]));
      
      // First check if the response is ok
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API responded with ${res.status}: ${errorText}`);
      }
      
      // Get the raw text first to check for valid JSON
      const responseText = await res.text();
      console.log("Raw response:", responseText);
      
      // Try to parse the JSON
      let payload;
      try {
        payload = JSON.parse(responseText);
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }
      
      if (!payload.success) {
        throw new Error(payload.error || "Benchmark failed");
      }
      
      setResults(payload.results);
    } catch (err: any) {
      console.error("Benchmark error:", err);
      alert("Error running benchmark:\n" + err.message);
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            LLM Model Evaluation
          </h1>
          <div className="w-full max-w-md">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Run Benchmark CTA */}
        <div className="flex flex-col items-center py-6">
          <div className="mb-2 text-center max-w-lg">
            <p className="text-gray-600 mb-6">
              Run benchmarks across all configured LLM models to compare their
              performance metrics.
            </p>
          </div>
          <BenchmarkButton
            onClick={() => setModalOpen(true)}
            disabled={loading}
          />
        </div>

        {/* Available Models */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Available Models
          </h2>
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

        {/* RESULTS PANEL */}
        {results && (
          <div className="bg-white p-6 rounded shadow mt-8">
            <h2 className="text-xl font-semibold mb-4">Latest Results</h2>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}

        {/* Benchmark Modal */}
        <BenchmarkModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSubmit={handleStartBenchmark}
          // You might also pass `loading` if you want to disable internal form
        />
      </div>
    </AppLayout>
  );
};

export default MainPage;
