// // src/pages/ReportPage.tsx

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Papa from "papaparse";

// import AppLayout from "@/components/layout/AppLayout";
// import ModelSelector from "@/components/layout/ModelSelector";
// import LineChart from "@/components/charts/LineChart";
// import PieChart from "@/components/charts/PieChart";
// import BarChart from "@/components/charts/BarChart";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useModelData } from "@/contexts/ModelDataContext";

// interface TTFTRow {
//   cdf: number;
//   "Time to First Token": number;
// }

// const ReportPage = () => {
//   const location = useLocation();
//   const {
//     models,
//     reports,
//     selectModel,
//     selectedModel,
//     getReportsForModel,
//   } = useModelData();

//   // 1️⃣ Pick modelId
//   const modelId = (location.state?.modelId as string) || models[0]?.id;
//   useEffect(() => {
//     if (modelId) selectModel(modelId);
//   }, [modelId, selectModel]);

//   const model = models.find((m) => m.id === modelId);
//   const modelReports = getReportsForModel(modelId);
//   const latestReport = modelReports[0];

//   // 2️⃣ Fallback static data (unused once CSV loads)
//   const lineChartData = [
//     { name: "Reasoning", value: latestReport?.tests[0]?.score || 80 },
//     { name: "Knowledge", value: latestReport?.tests[1]?.score || 85 },
//     { name: "Math", value: latestReport?.tests[2]?.score || 75 },
//     { name: "Language", value: latestReport?.tests[3]?.score || 90 },
//   ];

//   // 3️⃣ CSV‐driven data
//   const [performanceData, setPerformanceData] = useState<
//     Array<{ name: string; value: number }>
//   >([]);

//   useEffect(() => {
//     Papa.parse<TTFTRow>("src/data/ttft.csv", {
//       download: true,
//       header: true,
//       dynamicTyping: true,
//       skipEmptyLines: true,
//       complete: ({ data }) => {
//         setPerformanceData(
//           data.map((row) => ({
//             name: String(row.cdf),
//             value: row["Time to First Token"],
//           }))
//         );
//       },
//       error: (err) => console.error("CSV parse error:", err),
//     });
//   }, []);

//   // 4️⃣ Pie & Bar data (unchanged)
//   const pieChartData = [
//     { name: "Correct", value: latestReport?.metrics.accuracy || 65 },
//     { name: "Partial", value: latestReport?.metrics.consistency || 25 },
//     {
//       name: "Incorrect",
//       value:
//         100 -
//         (latestReport?.metrics.accuracy || 65) -
//         (latestReport?.metrics.consistency || 25),
//     },
//   ];
//   const barChartData = [
//     { name: "Accuracy", value: latestReport?.metrics.accuracy || 80 },
//     { name: "Speed", value: latestReport?.metrics.speed || 75 },
//     { name: "Consistency", value: latestReport?.metrics.consistency || 85 },
//     { name: "Reliability", value: latestReport?.metrics.reliability || 70 },
//   ];

//   return (
//     <AppLayout>
//       {/* Header */}
//       <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <h1 className="text-2xl font-semibold">
//           {model?.name} {model?.version} reports
//         </h1>
//         <ModelSelector />
//       </div>

//       {/* Top-row charts */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Performance Trend */}
//         <Card className="bg-white shadow-md">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">
//               Time to First Token
//             </CardTitle>
//           </CardHeader>
//           {/* zero padding so chart fills card */}
//           <CardContent className="p-0">
//             <LineChart
//               data={performanceData.length ? performanceData : lineChartData}
//               xAxisLabel="CDF"
//               yAxisLabel="Time to First Token (s)"
//             />
//           </CardContent>
//         </Card>

//         {/* Accuracy Distribution */}
//         <Card className="bg-white shadow-md">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">
//               Accuracy Distribution
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <PieChart data={pieChartData} />
//           </CardContent>
//         </Card>

//         {/* Benchmark Metrics */}
//         <Card className="bg-white shadow-md">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">
//               Benchmark Metrics
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <BarChart data={barChartData} />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Detailed Tests */}
//       <div className="mt-8">
//         <Card className="bg-white shadow-md">
//           <CardHeader>
//             <CardTitle>Detailed Evaluation Results</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="grid grid-cols-3 gap-4 border-b pb-2">
//                 <div className="font-medium">Test Name</div>
//                 <div className="font-medium">Score</div>
//                 <div className="font-medium">Status</div>
//               </div>
//               {latestReport?.tests.map((test, i) => (
//                 <div key={i} className="grid grid-cols-3 gap-4">
//                   <div>{test.name}</div>
//                   <div>{test.score}%</div>
//                   <div
//                     className={
//                       test.status === "passed"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }
//                   >
//                     {test.status === "passed" ? "Passed" : "Failed"}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </AppLayout>
//   );
// };

// export default ReportPage;
// src/pages/ReportPage.tsx

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ModelSelector from '@/components/layout/ModelSelector';
import LineChart from '@/components/charts/LineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useModelData } from '@/contexts/ModelDataContext';
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";
import { parseJsonMetrics, PivotedMetric } from '@/utils/parseJsonMetrics';
// Generic function to parse any CSV file
function parseCsv<T extends object>(
  url: string,
  setter: (data: { name: string; value: number }[]) => void,
  xKey: keyof T,
  yKey: keyof T
) {
  Papa.parse<T>(url, {
    download: true,
    header: true as const,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: results => {
      const data = (results.data as T[]).map(row => ({
        name: String(row[xKey]),
        value: Number((row as any)[yKey]),
      }));
      setter(data);
    },
    error: err => console.error(`Error parsing ${url}:`, err),
  });
}

// Define chart configurations
interface ChartConfig {
  id: string;
  title: string;
  csvFile: string;
  xKey: string;
  yKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  color: string;
}

const ReportPage: React.FC = () => {
  const location = useLocation();
  const {
    models,
    reports,
    selectModel,
    selectedModel,
    getReportsForModel,
  } = useModelData();

  // Model selection logic
  const modelId = (location.state?.modelId as string) || models[0]?.id;
  useEffect(() => {
    if (modelId) selectModel(modelId);
  }, [modelId, selectModel]);

  const model = models.find((m) => m.id === modelId);
  const modelReports = getReportsForModel(modelId);
  const latestReport = modelReports[0];


  const [summaryData, setSummaryData] = useState<PivotedMetric[]>([]);

  useEffect(() => {
    parseJsonMetrics('src/data/summary_metrics.json', setSummaryData);
    // If you have multiple:
    // Promise.all([
    //   parseJsonMetrics('/data/summary_modelA.json', setSummaryDataA),
    //   parseJsonMetrics('/data/summary_modelB.json', setSummaryDataB),
    // ]).then(([a, b]) => setSummaryData([...a, ...b]));
  }, []);
  // Define all chart configurations
  const chartConfigs: ChartConfig[] = [
    {
      id: 'ttft',
      title: 'Time to First Token',
      csvFile: 'src/data/ttft.csv',
      xKey: 'cdf',
      yKey: 'Time to First Token',
      xAxisLabel: 'CDF',
      yAxisLabel: 'Time to First Token (s)',
      color: '#8884d8', // Purple
    },
    {
      id: 'tpot',
      title: 'Time per Output Token',
      csvFile: 'src/data/tpot.csv',
      xKey: 'cdf',
      yKey: 'Time per Output Token',
      xAxisLabel: 'CDF',
      yAxisLabel: 'Time per Output Token (s)',
      color: '#82ca9d', // Green
    },
    {
      id: 'tbt',
      title: 'Time Between Tokens',
      csvFile: 'src/data/tbt.csv',
      xKey: 'cdf',
      yKey: 'Time Between Tokens',
      xAxisLabel: 'CDF',
      yAxisLabel: 'Time Between Tokens (s)',
      color: '#ffc658', // Yellow
    },
    {
      id: 'ot',
      title: 'Output Throughput',
      csvFile: 'src/data/output_throughput.csv',
      xKey: 'cdf',
      yKey: 'Output Throughput',
      xAxisLabel: 'CDF',
      yAxisLabel: 'Output Throughput',
      color: '#ff8042', // Orange
    },
    {
      id: 'nott',
      title: 'Number of Total Tokens',
      csvFile: 'src/data/num_total_tokens.csv',
      xKey: 'cdf',
      yKey: 'Number of Total Tokens',
      xAxisLabel: 'CDF',
      yAxisLabel: 'Number of Total Tokens (s)',
      color: '#0088FE', // Blue
    },
    {
      id: 'nopt',
      title: 'Number of Prompt Tokens',
      csvFile: 'src/data/num_prompt_tokens.csv',
      xKey: 'cdf',
      yKey: 'Number of Prompt Tokens',
      xAxisLabel: 'CDF',
      yAxisLabel: 'Number of Prompt Tokens (s)',
      color: '#00C49F', // Teal
    },
    {
      id: 'noot',
      title: 'Number of Output Tokens',
      csvFile: 'src/data/num_output_tokens.csv',
      xKey: 'cdf',
      yKey: 'Number of Output Tokens',
      xAxisLabel: 'CDF',
      yAxisLabel: 'Number of Output Tokens',
      color: '#FFBB28', // Gold
    },
    {
      id: 'etel',
      title: 'End to End Latency',
      csvFile: 'src/data/end_to_end_latency.csv',
      xKey: 'cdf',
      yKey: 'End to End Latency',
      xAxisLabel: 'CDF',
      yAxisLabel: 'End to End Latency',
      color: '#82ca9d', // Gold
    }
  ];


    const barChartData = [
    { name: "Mean", value: latestReport?.metrics.accuracy || 3158.900 },
    { name: "P50", value: latestReport?.metrics.speed || 2954.256 },
    { name: "P90", value: latestReport?.metrics.consistency || 5796.458 },
    { name: "P99", value: latestReport?.metrics.reliability || 5796.458 },
  ];
  // Create a state for each chart
  const [chartData, setChartData] = useState<Record<string, { name: string; value: number }[]>>(
    Object.fromEntries(chartConfigs.map(config => [config.id, []]))
  );

  // Load all CSV files on component mount
  useEffect(() => {
    chartConfigs.forEach(config => {
      // Use type assertion for dynamic column names
      type GenericCSVRow = Record<string, number>;
      
      parseCsv<GenericCSVRow>(
        config.csvFile,
        (data) => {
          setChartData(prev => ({
            ...prev,
            [config.id]: data
          }));
        },
        config.xKey as keyof GenericCSVRow,
        config.yKey as keyof GenericCSVRow
      );
    });
  }, []);

  // Define utility function to assign colors
  const getMetricColor = (metric: string): string => {
    // Map metrics to specific colors, or use a default color scheme
    const colorMap: Record<string, string> = {
      // Token metrics - blues
      "Prompt Tokens": "#66BB6A",         // Google Blue
      "Number of Prompt Tokens": "#4285F4",
      "Output Tokens": "#5E97F6",         // Light Blue
      "Number of Output Tokens": "#5E97F6",
      "Total Tokens": "#FFC107",          // Soft Blue
      "Number of Total Tokens": "#A4BDFC",
      
      // Timing metrics - purples and pinks
      "Time to First Token": "#8884d8",   // Purple
      "Time Between Tokens": "#B39DDB",   // Lavender
      "Time/Output Token": "#BA68C8",     // Medium Purple
      "Time per Output Token": "#BA68C8", 
      
      // Latency metrics - reds and oranges
      "E2E Latency": "#FF5252",           // Red
      "End to End Latency": "#FF5252",    
      "Norm. E2E Latency": "#FF7043",     // Deep Orange
      "Normalized End to End Latency": "#5E97F6",
      
      // Performance metrics - greens
      "Throughput": "#66BB6A",            // Green
      "Output Throughput": "#66BB6A",
      
      // Deadline metrics - yellows and ambers
      "Deadline Miss Rate": "#FFD54F",    // Amber
      "Min Deadline": "#FFC107",          // Yellow
      "Min Deadline for 10 % MR": "#FFC107"
    };
    
    // First try exact match
    if (colorMap[metric]) {
      return colorMap[metric];
    }
    
    // Then try partial matches
    for (const [key, color] of Object.entries(colorMap)) {
      if (metric.includes(key)) return color;
    }
    
    // Generate a color based on the hash of the metric name for unique colors
    let hash = 0;
    for (let i = 0; i < metric.length; i++) {
      hash = metric.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Convert to hex color (ensuring decent saturation and lightness)
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-semibold">
            {model?.name} {model?.version} reports
          </h1>
          <ModelSelector />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chartConfigs.map(config => (
            <Card key={config.id} className="bg-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{config.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {chartData[config.id]?.length > 0 ? (
                  <LineChart
                    data={chartData[config.id]}
                    xAxisLabel={config.xAxisLabel}
                    yAxisLabel={config.yAxisLabel}
                    color={config.color}
                  />
                ) : (
                  <p>Loading chart…</p>
                )}
              </CardContent>
            </Card>
          ))}

         
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryData.map(({ metric, series }) => (
          <Card key={metric} className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={series} 
                color={getMetricColor(metric)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-md">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium">
             Prompt Tokens
             </CardTitle>
           </CardHeader>
           <CardContent>
             <BarChart data={barChartData} />
           </CardContent>
         </Card>
         </div> */}
      </div>
    </AppLayout>
  );
};

export default ReportPage;
