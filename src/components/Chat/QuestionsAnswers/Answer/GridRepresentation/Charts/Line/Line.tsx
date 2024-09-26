import { Line as LineChart } from 'react-chartjs-2';
import { TooltipItem } from 'chart.js';
import { AnswerGrid } from '../../../../../../../types';
import { generateColors } from '../../../../../../../utils';

type LineProps = {
  grid: AnswerGrid;
};

export const Line = ({ grid }: LineProps) => {
  const { rows, columns, data } = grid;

  const colors = generateColors(columns.length);

  const datasets = columns.map((columnName, index) => ({
    label: columnName,
    data: data.map((dataSet) => dataSet[index].value),
    fill: false,
    borderColor: colors[index],
    backgroundColor: colors[index],
    tension: 0.1,
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
          label: (context: TooltipItem<'line'>) => {
            const rowIndex = context.datasetIndex;
            const columnIndex = context.dataIndex;

            context.formattedValue = data[columnIndex][rowIndex].formattedValue;
          },
        },
      },
    },
  };

  return (
    <div className="relative min-h-80 min-w-80 overflow-auto">
      <LineChart
        style={{
          height: rows.length * 100,
        }}
        options={options}
        data={{
          labels: rows,
          datasets: datasets,
        }}
      />
    </div>
  );
};
