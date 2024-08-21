import { ConfigProvider, Table, TableProps } from 'antd';
import { AnswerGrid } from '../../../../../types';

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
      title: '',
      dataIndex: 'name',
      key: 'name',
    },
    ...grid.columns.map((title) => ({ title, dataIndex: title, key: title })),
  ];

  const dataSource = grid.rows.map((rowName, index) => ({
    name: rowName,
    [grid.columns[0]]: grid.data[index][0].formattedValue,
  }));

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#E6FCE1',
            lineWidth: 1,
            borderColor: '#DBDBDB',
          },
        },
      }}
    >
      <Table
        size="middle"
        title={() => (
          <span className="text-sm font-bold">{grid.description}</span>
        )}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
      />
    </ConfigProvider>
  );
};
