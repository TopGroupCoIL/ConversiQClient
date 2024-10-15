import { useEffect, useState } from 'react';
import { Button, Flex, List, Spin, Typography } from 'antd';
import { useAuthContext } from '../../../context/auth';
import { fetchData } from '../../../api';
import { DataSource } from '../../../types';
import { DataSourceForm } from './DataSourceForm';

export const DataSources = () => {
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource>();

  useEffect(() => {
    const fetchDataSources = async () => {
      const res = await fetchData(`/customers/${user?.tenant}/datasources`);

      if (!res.ok) {
        return;
      }

      const dataSources = (await res.json()) as DataSource[];

      setDataSources(dataSources);

      setIsLoading(false);
    };

    if (user) {
      fetchDataSources();
    }
  }, [user]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" className="w-full h-full">
        <Spin size="large" />
      </Flex>
    );
  }

  const updateDataSource = (updatedDataSource: DataSource) => {
    setDataSources(
      dataSources.map((dataSource) => {
        if (dataSource.name !== updatedDataSource.name) {
          return dataSource;
        }

        return updatedDataSource;
      }),
    );
  };

  return (
    <Flex wrap className="w-full">
      <List
        header={<Typography.Title>Data sources list</Typography.Title>}
        itemLayout="horizontal"
        dataSource={dataSources}
        className="max-w-sm p-8 bg-white shadow-message rounded-md mr-8"
        renderItem={(dataSource) => (
          <List.Item>
            <Button
              type={
                dataSource.name === selectedDataSource?.name
                  ? 'default'
                  : 'text'
              }
              onClick={() => {
                setSelectedDataSource(dataSource);
              }}
            >
              {dataSource.name}
            </Button>
          </List.Item>
        )}
      />
      {selectedDataSource && (
        <DataSourceForm
          dataSource={selectedDataSource}
          key={selectedDataSource.name}
          updateDataSource={updateDataSource}
        />
      )}
    </Flex>
  );
};
