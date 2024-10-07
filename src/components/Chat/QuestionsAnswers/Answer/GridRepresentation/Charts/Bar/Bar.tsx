import { Bar as BarChart } from 'react-chartjs-2';
import { AnswerGrid } from '../../../../../../../types';
import { TooltipItem } from 'chart.js';
import { generateColors } from '../../../../../../../utils';

type BarProps = {
  grid: AnswerGrid;
  isHorizontal?: boolean;
};

export const Bar = ({ grid, isHorizontal }: BarProps) => {
  const { rows, columns, data } = grid;

  const colors = generateColors(rows.length);

  const datasets = rows.map((rowName, index) => ({
    label: rowName,
    backgroundColor: colors[index],
    barPercentage: 0.5,
    borderRadius: 3,
    minBarLength: 10,
    maxBarThickness: 16,
    pointStyle: 'circle',
    data: data[index].map(({ value }) => value),
  }));

  const indexAxis = isHorizontal ? ('y' as const) : ('x' as const);

  const options = {
    maintainAspectRatio: false,
    indexAxis,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'start' as const,
        labels: {
          align: 'start' as const,
          padding: 15,
          usePointStyle: true,
          font: {
            family: 'Arial Rounded MT Bold',
            size: 12,
            weight: 'bold' as const,
            lineHeight: 14.52,
          },
        },
      },
      tooltip: {
        callbacks: {
          title: () => {
            return '';
          },
          label: (context: TooltipItem<'bar'>) => {
            const rowIndex = context.datasetIndex;
            const columnIndex = context.dataIndex;

            const valueToDisplay = data[rowIndex][columnIndex].formattedValue;

            return `${context.dataset.label}: ${valueToDisplay}`;
          },
        },
      },
    },
  };

  return (
    <div className="relative w-full h-full min-h-80 min-w-80 overflow-auto p-1.5">
      <BarChart
        style={{
          height: rows.length * 50,
        }}
        options={options}
        data={{
          labels: columns,
          datasets: datasets,
        }}
        key={isHorizontal ? 'horizontal' : 'vertical'}
      />
    </div>
  );
};
