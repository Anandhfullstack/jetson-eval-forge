import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  color?: string;
}

const BarChart = ({ data, color = "#B397EF" }: BarChartProps) => {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart 
          data={data} 
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barSize={38}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: "#555" }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#555" }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            cursor={{ fill: `${color}20` }}
            contentStyle={{ 
              backgroundColor: "#fff", 
              borderRadius: "8px", 
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              border: "none"
            }}
          />
          <Bar 
            dataKey="value" 
            fill={color} 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
