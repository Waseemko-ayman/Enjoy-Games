/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  BarChart,
  Bar,
} from 'recharts';

interface ChartContainerProps {
  isLoading: boolean;
  isMounted: boolean;
  data: any[];
  type: 'line' | 'bar';
  dataKeys: string[];
  ChartHeight?: string;
}

const ChartContainer = ({
  isLoading,
  isMounted,
  data,
  type,
  dataKeys,
  ChartHeight = '400',
}: ChartContainerProps) => {
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        isMounted && (
          <div
            style={{ height: `${ChartHeight}px` }}
            className="h-[250px] sm:h-auto"
          >
            <ResponsiveContainer width="100%" height="100%">
              {type === 'line' ? (
                <LineChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip />
                  {dataKeys.map((key, index) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={`hsl(var(--primary), ${index * 20})`}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name={key}
                    />
                  ))}
                </LineChart>
              ) : (
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip />
                  {dataKeys.map((key) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                      name={key}
                    />
                  ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        )
      )}
    </>
  );
};

export default ChartContainer;
