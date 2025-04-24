import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface LineChartProps {
  data: Array<{ name: string; value: number }>;
  xAxisLabel?: string;
  yAxisLabel?: string;
  color?: string;
}

const LineChart = ({ data, xAxisLabel, yAxisLabel, color = "#B397EF" }: LineChartProps) => {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          // leave a bit of room for labels
          margin={{ top: 5, right: 10, left: 30, bottom: 25 }}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            label={
              xAxisLabel
                ? {
                    value: xAxisLabel,
                    position: "insideBottom",
                    offset: -5,
                    style: { fontSize: 12 }
                  }
                : undefined
            }
          />
          <YAxis
            tick={{ fontSize: 10 }}
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: "insideLeft",
                    offset: 0,
                    style: { textAnchor: "middle", fontSize: 12 }
                  }
                : undefined
            }
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
