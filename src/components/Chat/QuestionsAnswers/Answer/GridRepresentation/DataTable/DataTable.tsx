import { ConfigProvider, Table, TableProps } from 'antd';
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
      title: '',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
    },
    ...grid.columns.map((title) => ({
      title,
      dataIndex: title,
      key: title,
      width: 100,
    })),
  ];

  const dataSource = grid.rows.map((rowName, rowIndex) => {
    const rowsObjectData = Object.fromEntries(
      new Map(
        grid.columns.map((column, columnIndex) => [
          column,
          grid.data[rowIndex][columnIndex].value,
        ]),
      ),
    );

    return {
      name: rowName,
      ...rowsObjectData,
    };
  });

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
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 640, y: 320 }}
        bordered
      />
    </ConfigProvider>
  );
};
