import { useState } from 'react';
import { ActionType, AnswerGrid, DisplayType } from '../../../../../types';
import { DataTable } from './DataTable';
import { Bar } from './Charts';
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

    return <DataTable grid={grid} />;
  };

  return (
    <div>
      <GridHeader
        dataDescription={grid.description}
        onMenuItemClick={handleMenuItemClick}
      />
      <div className="relative max-w-screen-sm max-h-xs">{renderData()}</div>
    </div>
  );
};
