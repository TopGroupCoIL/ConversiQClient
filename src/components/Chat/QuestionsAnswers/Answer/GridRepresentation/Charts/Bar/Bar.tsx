import { Bar as BarChart } from 'react-chartjs-2';
import { barColors } from '../../../../../../../const';
import { AnswerGrid } from '../../../../../../../types';

type BarProps = {
  grid: AnswerGrid;
};

export const Bar = ({ grid }: BarProps) => {
  const { description, rows, columns, data } = grid;

  const datasets = rows.map((rowName, index) => ({
    label: rowName,
    backgroundColor: barColors[index],
    barPercentage: 0.5,
    borderRadius: 3,
    minBarLength: 10,
    pointStyle: 'circle',
    data: data[index].map(({ value }) => value),
  }));

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: description,
      },
      legend: {
        labels: {
          usePointStyle: true,
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
