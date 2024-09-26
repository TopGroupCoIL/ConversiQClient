import { useState } from 'react';
import { ActionType, AnswerGrid, PresentationType } from '../../../../../types';
import { DataTable } from './DataTable';
import { Bar, Doughnut, Line } from './Charts';
import { GridHeader } from './GridHeader';

type GridRepresentationProps = {
  grid: AnswerGrid;
};

export const GridRepresentation = ({ grid }: GridRepresentationProps) => {
  const [displayType, setDisplayType] = useState<PresentationType>(
    grid.presentationType,
  );

  const handleMenuItemClick = (key: string) => {
    if (key === ActionType.share || key === ActionType.export) {
      // to do
      return;
    }

    setDisplayType(key as PresentationType);
  };

  const renderData = () => {
    if (displayType === PresentationType.bar_chart) {
      return <Bar grid={grid} isHorizontal />;
    }

    if (displayType === PresentationType.column_chart) {
      return <Bar grid={grid} />;
    }

    if (displayType === PresentationType.line_chart) {
      return <Line grid={grid} />;
    }

    if (displayType === PresentationType.pie_chart) {
      return <Doughnut grid={grid} />;
    }

    return <DataTable grid={grid} />;
  };

  return (
    <div className="w-full h-full">
      <GridHeader
        dataDescription={grid.description}
        onMenuItemClick={handleMenuItemClick}
      />
      <div className="relative w-full h-full max-w-full max-h-full overflow:auto">
        {renderData()}
      </div>
    </div>
  );
};
