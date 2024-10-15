import { Button, Flex, Form, Input, Select, Space, Typography } from 'antd';
import { DataSource, DataSourceMeasure } from '../../../../types';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../../api';

type DataSourceForm = {
  dataSource: DataSource;
  updateDataSource: (dataSource: DataSource) => void;
};

export const DataSourceForm = ({
  dataSource,
  updateDataSource,
}: DataSourceForm) => {
  const [isDataBasesLoading, setIsDataBasesLoading] = useState(false);
  const [isCubesLoading, setIsCubesLoading] = useState(false);
  const [isMeasuresLoading, setIsMeasuresLoading] = useState(false);

  const [isDataSourceUpdating, setIsDataSourceUpdating] = useState(false);

  const [dataBases, setDataBases] = useState<string[]>([]);
  const [cubes, setCubes] = useState<string[]>([]);
  const [measures, setMeasures] = useState<DataSourceMeasure[]>([
    { caption: 'No default measure', uName: null },
  ]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (dataSource.database) {
      setDataBases([dataSource.database]);
    }

    if (dataSource.cube) {
      setCubes([dataSource.cube]);
    }

    return () => {
      form.resetFields();
    };
  }, [dataSource, form]);

  const fetchDataBases = async () => {
    setDataBases([]);
    setCubes([]);
    setMeasures([]);

    form.setFieldValue('database', '');
    form.setFieldValue('cube', '');
    form.setFieldValue('defaultMeasure', '');

    setIsDataBasesLoading(true);

    const server = form.getFieldValue('server') || dataSource.server;

    try {
      const res = await fetchData(
        `/catalogs/customer/${dataSource.tenant}/server/${server.replace(
          '\\',
          '%5C',
        )}`,
      );

      const dataBases = (await res.json()) as string[];

      setDataBases(dataBases);
    } catch (e) {
      setIsDataBasesLoading(false);
    }

    setIsDataBasesLoading(false);
  };

  const fetchCubes = async (catalog: string) => {
    setCubes([]);
    setMeasures([]);

    form.setFieldValue('cube', '');
    form.setFieldValue('defaultMeasure', '');

    setIsCubesLoading(true);

    const server = form.getFieldValue('server') || dataSource.server;

    try {
      const res = await fetchData(
        `/cubes/customer/${dataSource.tenant}/server/${server.replace(
          '\\',
          '%5C',
        )}/catalog/${catalog.replace(' ', '%20')}`,
      );

      const cubes = (await res.json()) as string[];

      setCubes(cubes);
    } catch (e) {
      setIsCubesLoading(false);
    }

    setIsCubesLoading(false);
  };

  const fetchMeasures = async (cube: string) => {
    setIsMeasuresLoading(true);

    const server = form.getFieldValue('server') || dataSource.server;
    const catalog = form.getFieldValue('database');

    try {
      const res = await fetchData(
        `/measures/customer/${dataSource.tenant}/server/${server.replace(
          '\\',
          '%5C',
        )}/catalog/${catalog.replace(' ', '%20')}/cube/${cube.replace(
          ' ',
          '%20',
        )}`,
      );

      const measures = (await res.json()) as DataSourceMeasure[];

      setMeasures(measures);
    } catch (e) {
      setIsMeasuresLoading(false);
    }

    setIsMeasuresLoading(false);
  };

  const onFinish = async (values: DataSource) => {
    setIsDataSourceUpdating(true);

    try {
      const res = await fetchData(
        '/customers/datasource',
        'PUT',
        JSON.stringify({
          cube: values.cube,
          database: values.database,
          defaultMeasure: values.defaultMeasure || null,
          description: values.description,
          name: dataSource.name,
          server: values.server,
          tenant: dataSource.tenant,
        }),
      );
      const updatedDataSource = (await res.json()) as DataSource;

      updateDataSource(updatedDataSource);
    } catch (e) {
      setIsDataSourceUpdating(false);
    }

    setIsDataSourceUpdating(false);
  };

  return (
    <Flex
      vertical
      className="max-w-xl p-8 bg-white rounded-md shadow-message"
      key={dataSource.name}
    >
      <Typography.Title className="py-4">{dataSource.name}</Typography.Title>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          label="Description"
          name="description"
          initialValue={dataSource.description}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tenant"
          name="tenant"
          initialValue={dataSource.tenant}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="Server">
          <Space>
            <Form.Item name="server" initialValue={dataSource.server} noStyle>
              <Input />
            </Form.Item>
            <Button
              type="primary"
              onClick={() => {
                fetchDataBases();
              }}
            >
              Connect
            </Button>
          </Space>
        </Form.Item>
        <Form.Item
          label="Database"
          name="database"
          initialValue={dataSource.database}
        >
          <Select
            disabled={!(dataSource.database || !dataBases.length)}
            loading={isDataBasesLoading}
            options={dataBases.map((dataBase) => ({
              value: dataBase,
              label: dataBase,
            }))}
            defaultValue={dataSource.database}
            onChange={fetchCubes}
          />
        </Form.Item>
        <Form.Item
          label="Cube"
          name="cube"
          initialValue={dataSource.cube}
          dependencies={['database']}
        >
          <Select
            disabled={!cubes.length}
            loading={isCubesLoading}
            options={cubes.map((dataBase) => ({
              value: dataBase,
              label: dataBase,
            }))}
            onChange={fetchMeasures}
          />
        </Form.Item>
        <Form.Item
          label="Default measure"
          name="defaultMeasure"
          initialValue={null}
          dependencies={['database', 'cube']}
        >
          <Select
            disabled={!measures.length}
            loading={isMeasuresLoading}
            options={measures.map((measure) => ({
              value: measure.uName,
              label: measure.caption,
            }))}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isDataSourceUpdating}
            disabled={isDataSourceUpdating}
          >
            Update data source
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
