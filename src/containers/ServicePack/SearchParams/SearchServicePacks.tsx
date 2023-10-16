import { Button, Card, Col, Form, Row, Select, Input, Modal } from 'antd';
import React, { useState } from 'react';
import CreateServicePack from '../../../components/ServicePack/CreateServicePack';

const { Item } = Form;

const SearchServicePacks = ({
  getList,
  isGetList,
}: {
  getList: (params: any) => void;
  isGetList: boolean;
}) => {
  const [form] = Form.useForm();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onGetPacks = (values: any) => {
    getList(values);
  };

  return (
    <>
      <Card style={{ boxShadow: '5px 8px 24px 5px #dcdedc' }}>
        <Form
          layout={'vertical'}
          form={form}
          onFinish={onGetPacks}
          initialValues={{
            type: 0,
            status: 0,
          }}
        >
          <Row gutter={[10, 10]}>
            <Col span={6}>
              <Item name={'name'} label={'Tên gói dịch vụ'}>
                <Input placeholder={'Tên gói dịch vụ'} />
              </Item>
            </Col>
            <Col span={6}>
              <Item name={'status'} label={'Trạng thái'}>
                <Select
                  options={[
                    { value: 0, label: 'Tất cả' },
                    { value: 1, label: 'Hoạt động' },
                    { value: 2, label: 'Không hoạt động' },
                  ]}
                ></Select>
              </Item>
            </Col>
            <Col span={6}>
              <Item label={' '}>
                <Button
                  type={'primary'}
                  htmlType={'submit'}
                  loading={isGetList}
                >
                  Tìm kiếm
                </Button>
              </Item>
            </Col>
            <Col span={6}>
              <Item
                label={' '}
                style={{ display: 'flex', justifyContent: 'end' }}
              >
                <Button type={'primary'} onClick={() => setIsVisible(true)}>
                  Tạo gói dịch vụ
                </Button>
              </Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Modal
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={[]}
      >
        <CreateServicePack onCancel={() => setIsVisible(false)} />
      </Modal>
    </>
  );
};

export default SearchServicePacks;
