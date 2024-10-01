import { Doughnut as DoughnutChart } from 'react-chartjs-2';
import { AnswerGrid } from '../../../../../../../types';
import { TooltipItem } from 'chart.js';
import { Flex } from 'antd';
import { generateColors } from '../../../../../../../utils';

type DoughnutProps = {
  grid: AnswerGrid;
};

export const Doughnut = ({ grid }: DoughnutProps) => {
  const { rows, columns, data } = grid;

  const colors = generateColors(columns.length);

  const defaultOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <Flex wrap className="w-full h-full overflow-auto">
      {columns.map((column, columnIndex) => {
        const datasets = [
          {
            label: column,
            data: rows.map((_, rowIndex) => {
              return data[rowIndex][columnIndex].value;
            }),
            backgroundColor: colors,
            hoverOffset: 4,
          },
        ];

        const options = {
          ...defaultOptions,
          plugins: {
            ...defaultOptions.plugins,
            subtitle: {
              display: true,
              text: column,
            },
            tooltip: {
              callbacks: {
                label: (context: TooltipItem<'doughnut'>) => {
                  const rowIndex = context.dataIndex;

                  context.formattedValue =
                    data[rowIndex][columnIndex].formattedValue;
                },
              },
            },
          },
        };

        return (
          <div
            className={columns.length > 1 ? `w-1/2 h-full` : `w-full h-full`}
          >
            <DoughnutChart
              options={options}
              data={{
                labels: rows,
                datasets,
              }}
            />
          </div>
        );
      })}
    </Flex>
  );
};
