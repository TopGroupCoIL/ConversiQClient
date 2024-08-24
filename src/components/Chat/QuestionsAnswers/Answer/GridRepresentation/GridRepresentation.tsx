import { useState } from 'react';
import { AnswerGrid } from '../../../../../types';
import { DataTable } from './DataTable';
import { Bar } from './Charts';
import { Segmented } from 'antd';
import { BarChartOutlined, TableOutlined } from '@ant-design/icons';

type GridRepresentationProps = {
  grid: AnswerGrid;
};

enum DisplayType {
  table = 'table',
  bar = 'bar',
}

export const GridRepresentation = ({ grid }: GridRepresentationProps) => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.table,
  );

  const renderData = () => {
    if (displayType === DisplayType.bar) {
      return <Bar grid={grid} />;
    }

    return <DataTable grid={grid} />;
  };

  return (
    <div className="">
      <Segmented
        options={[
          { value: DisplayType.table, icon: <TableOutlined /> },
          { value: DisplayType.bar, icon: <BarChartOutlined /> },
        ]}
        value={displayType}
        size="large"
        className="mb-4"
        onChange={(type: DisplayType) => {
          setDisplayType(type);
        }}
      />
      <div className="relative max-w-screen-sm max-h-xs">{renderData()}</div>
    </div>
  );
};
