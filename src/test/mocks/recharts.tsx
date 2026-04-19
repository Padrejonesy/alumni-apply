import React from "react";

const createChartComponent = (name: string) => {
  const Component = ({ children, ...props }: { children?: React.ReactNode }) => (
    <div data-testid={`mock-${name}`} {...props}>
      {children}
    </div>
  );
  Component.displayName = name;
  return Component;
};

export const ResponsiveContainer = createChartComponent("ResponsiveContainer");
export const Tooltip = createChartComponent("Tooltip");
export const Legend = createChartComponent("Legend");
export const CartesianGrid = createChartComponent("CartesianGrid");
export const XAxis = createChartComponent("XAxis");
export const YAxis = createChartComponent("YAxis");
export const BarChart = createChartComponent("BarChart");
export const Bar = createChartComponent("Bar");
export const LineChart = createChartComponent("LineChart");
export const Line = createChartComponent("Line");
export const PieChart = createChartComponent("PieChart");
export const Pie = createChartComponent("Pie");
export const Cell = createChartComponent("Cell");
export const AreaChart = createChartComponent("AreaChart");
export const Area = createChartComponent("Area");
export const ComposedChart = createChartComponent("ComposedChart");
export const LabelList = createChartComponent("LabelList");
export const ReferenceLine = createChartComponent("ReferenceLine");
