import { useState } from 'react';
import { ActionType, AnswerGrid, DisplayType } from '../../../../../types';
import { DataTable } from './DataTable';
import { Bar, Doughnut } from './Charts';
import { GridHeader } from './GridHeader';

type GridRepresentationProps = {
  grid: AnswerGrid;
};

export const GridRepresentation = ({ grid }: GridRepresentationProps) => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.table,
  );

  const handleMenuItemClick = (key: string) => {
    if (key === ActionType.share || key === ActionType.export) {
      // to do
      return;
    }

    setDisplayType(key as DisplayType);
  };

  const renderData = () => {
    if (displayType === DisplayType.bar) {
      return <Bar grid={grid} />;
    }

    if (displayType === DisplayType.doughnut) {
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
