import { Bar as BarChart } from 'react-chartjs-2';
import { chartColors } from '../../../../../../../const';
import { AnswerGrid } from '../../../../../../../types';
import { TooltipItem } from 'chart.js';

type BarProps = {
  grid: AnswerGrid;
};

export const Bar = ({ grid }: BarProps) => {
  const { rows, columns, data } = grid;

  const datasets = rows.map((rowName, index) => ({
    label: rowName,
    backgroundColor: chartColors[index],
    barPercentage: 0.5,
    borderRadius: 3,
    minBarLength: 10,
    maxBarThickness: 16,
    pointStyle: 'circle',
    data: data[index].map(({ value }) => value),
  }));

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'start' as const,
        labels: {
          align: 'start' as const,
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const rowIndex = context.datasetIndex;
            const columnIndex = context.dataIndex;

            context.formattedValue = data[rowIndex][columnIndex].formattedValue;
          },
        },
      },
    },
  };

  return (
    <div className="relative min-h-80 min-w-80 overflow-auto">
      <BarChart
        style={{
          height: rows.length * 50,
        }}
        options={options}
        data={{
          labels: columns,
          datasets: datasets,
        }}
      />
    </div>
  );
};
