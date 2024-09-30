import { useState } from 'react';
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
        return 'max-w-[50%]';
      }

      if (dataSize <= 6) {
        return 'max-w-[70%]';
      }

      if (dataSize <= 10) {
        return 'max-w-[90%]';
      }

      return 'max-w-full';
    }

    if (presentationType === PresentationType.pie_chart) {
      const dataSize = grid.rows.length;

      if (dataSize <= 6) {
        return 'max-w-[35%]';
      }

      if (dataSize <= 12) {
        return 'max-w-[50%]';
      }

      if (dataSize <= 24) {
        return 'max-w-[75%]';
      }

      return 'max-w-full';
    }

    const dataSize = grid.rows.length;

    if (dataSize <= 6) {
      return 'max-w-[35%]';
    }

    if (dataSize <= 12) {
      return 'max-w-[50%]';
    }

    if (dataSize <= 24) {
      return 'max-w-[75%]';
    }

    return 'max-w-full';
  };

  const maxWidth = getContainerWidth();

  return (
    <AnswerWrapper styledClasses={maxWidth}>
      <div className={`w-full`}>
        <GridHeader
          dataDescription={grid.description}
          onMenuItemClick={handleMenuItemClick}
        />
        <div className="relative w-full h-full overflow:auto">
          {renderData()}
        </div>
        {isRowsLimitExceeded && (
          <div className="my-4">
            Number of rows in the data for the requested information is higher
            than the number of rows presented.
          </div>
        )}
      </div>
    </AnswerWrapper>
  );
};
