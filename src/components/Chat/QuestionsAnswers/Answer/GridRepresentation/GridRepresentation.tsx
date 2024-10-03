import { useState } from 'react';
import { Flex } from 'antd';
import { ActionType, AnswerGrid, PresentationType } from '../../../../../types';
import { DataTable } from './DataTable';
import { Bar, Doughnut, Line } from './Charts';
import { GridHeader } from './GridHeader';
import { AnswerWrapper } from '../AnswerWrapper';

type GridRepresentationProps = {
  grid: AnswerGrid;
};

const MAX_ROWS_AVAILABLE = 30;

export const GridRepresentation = ({ grid }: GridRepresentationProps) => {
  const [presentationType, setPresentationType] = useState<PresentationType>(
    grid.presentationType,
  );

  const isRowsLimitExceeded = grid.rows.length > MAX_ROWS_AVAILABLE;

  const handleMenuItemClick = (key: string) => {
    if (key === ActionType.share || key === ActionType.export) {
      // to do
      return;
    }

    setPresentationType(key as PresentationType);
  };

  const renderData = () => {
    const gridToShow: AnswerGrid = isRowsLimitExceeded
      ? {
          ...grid,
          rows: [...grid.rows].slice(0, MAX_ROWS_AVAILABLE),
          data: [...grid.data].slice(0, MAX_ROWS_AVAILABLE),
        }
      : grid;

    if (presentationType === PresentationType.bar_chart) {
      return <Bar grid={gridToShow} isHorizontal />;
    }

    if (presentationType === PresentationType.column_chart) {
      return <Bar grid={gridToShow} />;
    }

    if (presentationType === PresentationType.line_chart) {
      return <Line grid={gridToShow} />;
    }

    if (presentationType === PresentationType.pie_chart) {
      return <Doughnut grid={gridToShow} />;
    }

    return <DataTable grid={gridToShow} />;
  };

  const getContainerWidth = () => {
    if (presentationType === PresentationType.grid) {
      const dataSize = grid.columns.length;

      if (dataSize <= 3) {
        return 'lg:max-w-[50%]';
      }

      if (dataSize <= 6) {
        return 'lg:max-w-[70%]';
      }

      if (dataSize <= 10) {
        return 'lg:max-w-[90%]';
      }

      return 'lg:max-w-full';
    }

    if (presentationType === PresentationType.pie_chart) {
      const dataSize = grid.rows.length;

      if (dataSize <= 6) {
        return 'lg:max-w-[80%] aspect-[2/1]';
      }

      if (dataSize <= 12) {
        return 'lg:max-w-[85%] aspect-[2/1]';
      }

      if (dataSize <= 24) {
        return 'lg:max-w-[90%] aspect-[5/2]';
      }

      return 'lg:max-w-full aspect-[10/3]';
    }

    const dataSize = grid.rows.length;

    if (dataSize <= 6) {
      return 'lg:max-w-[80%] aspect-[10/8]';
    }

    if (dataSize <= 12) {
      return 'lg:max-w-[85%] aspect-[10/8]';
    }

    if (dataSize <= 24) {
      return 'lg:max-w-[90%] aspect-[2/1]';
    }

    return 'lg:max-w-full aspect-[10/4]';
  };

  const maxWidth = getContainerWidth();

  return (
    <AnswerWrapper styledClasses={maxWidth}>
      <Flex
        vertical
        className={`w-full ${
          presentationType === PresentationType.grid ? '' : 'h-full'
        }`}
      >
        <GridHeader
          dataDescription={grid.description}
          onMenuItemClick={handleMenuItemClick}
        />
        <div
          className={`relative w-full ${
            presentationType === PresentationType.grid
              ? ''
              : `${
                  isRowsLimitExceeded
                    ? 'h-[calc(100%-118px)]'
                    : 'h-[calc(100%-46px)]'
                } h-[80%]`
          } overflow-auto`}
        >
          {renderData()}
        </div>
        {isRowsLimitExceeded && (
          <div className="w-full h-9 my-4">
            Number of rows in the data for the requested information is higher
            than the number of rows presented.
          </div>
        )}
      </Flex>
    </AnswerWrapper>
  );
};
