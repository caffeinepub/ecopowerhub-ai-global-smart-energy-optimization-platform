import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { EnergyData } from '../../types';

interface TemperatureGaugeProps {
  data: EnergyData[];
  useCelsius?: boolean;
}

export default function TemperatureGauge({ data, useCelsius = true }: TemperatureGaugeProps) {
  const convertTemp = (celsius: number) => {
    return useCelsius ? celsius : (celsius * 9) / 5 + 32;
  };

  const chartData = data.map((item) => ({
    location: item.location,
    temperature: convertTemp(item.temperature),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="temperature"
          fill="hsl(var(--primary))"
          name={`Temperature (°${useCelsius ? 'C' : 'F'})`}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
