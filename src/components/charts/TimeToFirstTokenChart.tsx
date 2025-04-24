import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Time to First Token Chart component that loads data from a CSV file
const TimeToFirstTokenChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTTFTData = async () => {
      setIsLoading(true);
      
      try {
        // Hard-coded path to the CSV file - no modelId needed
        const csvFilePath = "/data/time_to_first_token.csv";
        
        const response = await fetch(csvFilePath);
        if (!response.ok) {
          throw new Error(`Failed to load CSV from ${csvFilePath}`);
        }
        
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');
        
        // Skip header line and parse data
        const data = lines.slice(1).map(line => {
          const [index, percentile, timeValue] = line.split(',');
          return {
            index: parseInt(index),
            percentile: parseFloat(percentile),
            timeToFirstToken: parseFloat(timeValue)
          };
        });
        
        setChartData(data);
        setError(null);
      } catch (err) {
        console.error("Error loading TTFT data:", err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTTFTData();
  }, []);

  if (isLoading) return <div className="flex items-center justify-center h-64">Loading data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!chartData.length) return <div>No data available</div>;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="percentile" 
            name="Percentile" 
            label={{ value: 'Percentile', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis 
            label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip formatter={(value) => [
            typeof value === 'number' ? `${value.toFixed(4)}s` : `${value}s`, 
            'Time to First Token'
          ]} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="timeToFirstToken" 
            name="Time to First Token" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeToFirstTokenChart;