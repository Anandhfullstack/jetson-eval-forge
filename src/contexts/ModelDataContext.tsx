
import { createContext, useContext, useState, ReactNode } from 'react';

interface Model {
  id: string;
  name: string;
  version: string;
  benchmarkScore: number;
  lastRun: string;
}

interface Report {
  id: string;
  modelId: string;
  date: string;
  metrics: {
    accuracy: number;
    speed: number;
    consistency: number;
    reliability: number;
  };
  tests: Array<{
    name: string;
    score: number;
    status: 'passed' | 'failed';
  }>;
}

interface ModelDataContextType {
  models: Model[];
  reports: Report[];
  selectedModel: string | null;
  addModel: (model: Omit<Model, 'id'>) => void;
  addReport: (report: Omit<Report, 'id'>) => void;
  selectModel: (id: string) => void;
  getReportsForModel: (modelId: string) => Report[];
}

const ModelDataContext = createContext<ModelDataContextType | undefined>(undefined);

// Default sample data
const defaultModels: Model[] = [
  {
    id: '1',
    name: 'Owen',
    version: '3.2',
    benchmarkScore: 87,
    lastRun: '2025-04-10T14:30:00Z',
  },
  {
    id: '2',
    name: 'Llama',
    version: '3.2',
    benchmarkScore: 82,
    lastRun: '2025-04-12T09:15:00Z',
  },
];

const defaultReports: Report[] = [
  {
    id: '1',
    modelId: '1',
    date: '2025-04-10T14:30:00Z',
    metrics: {
      accuracy: 87,
      speed: 76,
      consistency: 91,
      reliability: 84,
    },
    tests: [
      { name: 'Reasoning Test', score: 89, status: 'passed' },
      { name: 'Knowledge Test', score: 92, status: 'passed' },
      { name: 'Math Test', score: 73, status: 'passed' },
      { name: 'Language Test', score: 95, status: 'passed' },
    ],
  },
  {
    id: '2',
    modelId: '2',
    date: '2025-04-12T09:15:00Z',
    metrics: {
      accuracy: 82,
      speed: 88,
      consistency: 78,
      reliability: 80,
    },
    tests: [
      { name: 'Reasoning Test', score: 81, status: 'passed' },
      { name: 'Knowledge Test', score: 85, status: 'passed' },
      { name: 'Math Test', score: 86, status: 'passed' },
      { name: 'Language Test', score: 75, status: 'passed' },
    ],
  },
];

export const ModelDataProvider = ({ children }: { children: ReactNode }) => {
  const [models, setModels] = useState<Model[]>(defaultModels);
  const [reports, setReports] = useState<Report[]>(defaultReports);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const addModel = (model: Omit<Model, 'id'>) => {
    const newModel = {
      ...model,
      id: String(models.length + 1),
    };
    setModels([...models, newModel]);
  };

  const addReport = (report: Omit<Report, 'id'>) => {
    const newReport = {
      ...report,
      id: String(reports.length + 1),
    };
    setReports([...reports, newReport]);
  };

  const selectModel = (id: string) => {
    setSelectedModel(id);
  };

  const getReportsForModel = (modelId: string) => {
    return reports.filter(report => report.modelId === modelId);
  };

  return (
    <ModelDataContext.Provider
      value={{
        models,
        reports,
        selectedModel,
        addModel,
        addReport,
        selectModel,
        getReportsForModel,
      }}
    >
      {children}
    </ModelDataContext.Provider>
  );
};

export const useModelData = () => {
  const context = useContext(ModelDataContext);
  if (context === undefined) {
    throw new Error('useModelData must be used within a ModelDataProvider');
  }
  return context;
};
