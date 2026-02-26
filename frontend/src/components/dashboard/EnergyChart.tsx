import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { EnergyData } from '../../types';

interface EnergyChartProps {
  data: EnergyData[];
}

export default function EnergyChart({ data }: EnergyChartProps) {
  const chartData = data.map((item) => ({
    time: new Date(Number(item.timestamp) / 1000000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    consumption: item.energyConsumption,
    temperature: item.temperature,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="consumption"
          stroke="hsl(var(--primary))"
          name="Energy (kWh)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="temperature"
          stroke="hsl(var(--destructive))"
          name="Temperature (°C)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
