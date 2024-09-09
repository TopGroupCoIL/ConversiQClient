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
    pointStyle: 'circle',
    data: data[index].map(({ value }) => value),
  }));

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
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
    <div className="relative">
      <BarChart
        options={options}
        data={{
          labels: columns,
          datasets: datasets,
        }}
      />
    </div>
  );
};
