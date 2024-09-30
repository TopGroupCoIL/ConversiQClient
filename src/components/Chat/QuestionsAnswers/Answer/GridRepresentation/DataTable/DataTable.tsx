import { Table, TableProps } from 'antd';
import { AnswerGrid } from '../../../../../../types';

type DataTableProps = {
  grid: AnswerGrid;
};

interface DataType {
  [x: string]: string;
  name: string;
}

export const DataTable = ({ grid }: DataTableProps) => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: grid.cornerInfo || '',
      dataIndex: 'name',
      key: 'name',
    },
    ...grid.columns.map((title) => ({
      title,
      dataIndex: title,
      key: title,
    })),
  ];

  const dataSource = grid.rows.map((rowName, rowIndex) => {
    const rowsObjectData = Object.fromEntries(
      new Map(
        grid.columns.map((column, columnIndex) => [
          column,
          grid.data[rowIndex][columnIndex].formattedValue,
        ]),
      ),
    );

    return {
      name: rowName,
      ...rowsObjectData,
    };
  });

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      size="small"
      scroll={{ x: '100%' }}
    />
  );
};
