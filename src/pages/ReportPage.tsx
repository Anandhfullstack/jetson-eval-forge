
import { useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModelData } from "@/contexts/ModelDataContext";
import { useEffect } from "react";
import ModelSelector from "@/components/layout/ModelSelector";

const ReportPage = () => {
  const location = useLocation();
  const { models, reports, selectModel, selectedModel, getReportsForModel } = useModelData();
  
  // Get modelId from location state or use the first model as default
  const modelId = (location.state?.modelId as string) || models[0]?.id;
  
  useEffect(() => {
    if (modelId) {
      selectModel(modelId);
    }
  }, [modelId, selectModel]);
  
  const model = models.find(m => m.id === modelId);
  const modelReports = getReportsForModel(modelId);
  const latestReport = modelReports[0];
  
  // Data for charts
  const lineChartData = [
    { name: 'Reasoning', value: latestReport?.tests[0]?.score || 80 },
    { name: 'Knowledge', value: latestReport?.tests[1]?.score || 85 },
    { name: 'Math', value: latestReport?.tests[2]?.score || 75 },
    { name: 'Language', value: latestReport?.tests[3]?.score || 90 },
  ];

  const pieChartData = [
    { name: 'Correct', value: latestReport?.metrics.accuracy || 65 },
    { name: 'Partial', value: latestReport?.metrics.consistency || 25 },
    { name: 'Incorrect', value: 100 - (latestReport?.metrics.accuracy || 65) - (latestReport?.metrics.consistency || 25) },
  ];

  const barChartData = [
    { name: 'Accuracy', value: latestReport?.metrics.accuracy || 80 },
    { name: 'Speed', value: latestReport?.metrics.speed || 75 },
    { name: 'Consistency', value: latestReport?.metrics.consistency || 85 },
    { name: 'Reliability', value: latestReport?.metrics.reliability || 70 },
  ];

  return (
    <AppLayout>
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-semibold">{model?.name} {model?.version} reports</h1>
          <div className="flex items-center">
            <ModelSelector />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart data={lineChartData} />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart data={pieChartData} />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Benchmark Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={barChartData} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle>Detailed Evaluation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b pb-2">
                  <div className="font-medium">Test Name</div>
                  <div className="font-medium">Score</div>
                  <div className="font-medium">Status</div>
                </div>
                
                {latestReport?.tests.map((test, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4">
                    <div>{test.name}</div>
                    <div>{test.score}%</div>
                    <div className={test.status === 'passed' ? 'text-green-600' : 'text-red-600'}>
                      {test.status === 'passed' ? 'Passed' : 'Failed'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
  );
};

export default ReportPage;
