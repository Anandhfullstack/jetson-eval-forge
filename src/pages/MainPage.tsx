
// import { useState } from "react";
// import AppLayout from "@/components/layout/AppLayout";
// import SearchBar from "@/components/main/SearchBar";
// import ModelCard from "@/components/main/ModelCard";
// import { useModelData } from "@/contexts/ModelDataContext";
// import BenchmarkButton from "@/components/main/BenchmarkButton";

// const MainPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { models } = useModelData();

//   const handleSearch = (value: string) => {
//     setSearchTerm(value);
//   };

//   const handleRunBenchmark = () => {
//     console.log("Running benchmark...");
//     // Implement benchmark logic here
//   };

//   const filteredModels = models.filter(model => 
//     model.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <AppLayout>
//       <div className="space-y-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <h1 className="text-2xl font-bold text-gray-800">LLM Model Evaluation</h1>
//           <div className="w-full max-w-md">
//             <SearchBar onSearch={handleSearch} />
//           </div>
//         </div>
        
//         <div className="flex flex-col items-center py-6">
//           <div className="mb-2 text-center max-w-lg">
//             <p className="text-gray-600 mb-6">
//               Run benchmarks across all configured LLM models to compare their performance metrics.
//             </p>
//           </div>
//           <BenchmarkButton onClick={handleRunBenchmark} />
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Models</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredModels.map((model) => (
//               <ModelCard
//                 key={model.id}
//                 id={model.id}
//                 name={model.name}
//                 version={model.version}
//                 lastRun={model.lastRun}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default MainPage;


// src/pages/MainPage.tsx
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import SearchBar from "@/components/main/SearchBar";
import ModelCard from "@/components/main/ModelCard";
import { useModelData } from "@/contexts/ModelDataContext";
import BenchmarkButton from "@/components/main/BenchmarkButton";
import BenchmarkModal, { FormValues } from "@/components/main/BenchmarkModal";

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

  // UPDATED: async function that POSTS to your Express backend
  const handleStartBenchmark = async (formValues: FormValues) => {
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch("/benchmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const payload = await res.json();
      if (!payload.success) {
        throw new Error(payload.error || "Benchmark failed");
      }
      setResults(payload.results);
    } catch (err: any) {
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
          >
            {loading ? "Running…" : "Run Benchmark"}
          </BenchmarkButton>
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
