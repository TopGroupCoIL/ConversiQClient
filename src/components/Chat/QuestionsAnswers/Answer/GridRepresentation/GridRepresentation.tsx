import { useState } from 'react';
import { ActionType, AnswerGrid, PresentationType } from '../../../../../types';
import { DataTable } from './DataTable';
import { Bar, Doughnut, Line } from './Charts';
import { GridHeader } from './GridHeader';
import { AnswerWrapper } from '../AnswerWrapper';

type GridRepresentationProps = {
  grid: AnswerGrid;
};

export const GridRepresentation = ({ grid }: GridRepresentationProps) => {
  const [presentationType, setPresentationType] = useState<PresentationType>(
    grid.presentationType,
  );

  const handleMenuItemClick = (key: string) => {
    if (key === ActionType.share || key === ActionType.export) {
      // to do
      return;
    }

    setPresentationType(key as PresentationType);
  };

  const renderData = () => {
    if (presentationType === PresentationType.bar_chart) {
      return <Bar grid={grid} isHorizontal />;
    }

    if (presentationType === PresentationType.column_chart) {
      return <Bar grid={grid} />;
    }

    if (presentationType === PresentationType.line_chart) {
      return <Line grid={grid} />;
    }

    if (presentationType === PresentationType.pie_chart) {
      return <Doughnut grid={grid} />;
    }

    return <DataTable grid={grid} />;
  };

  const getContainerWidth = () => {
    if (presentationType === PresentationType.grid) {
      const dataSize = grid.columns.length;

      if (dataSize <= 3) {
        return 'max-w-[35%]';
      }

      if (dataSize <= 6) {
        return 'max-w-[50%]';
      }

      if (dataSize <= 10) {
        return 'max-w-[75%]';
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
      <div className={`w-full h-full `}>
        <GridHeader
          dataDescription={grid.description}
          onMenuItemClick={handleMenuItemClick}
        />
        <div className="relative w-full h-full overflow:auto">
          {renderData()}
        </div>
      </div>
    </AnswerWrapper>
  );
};
