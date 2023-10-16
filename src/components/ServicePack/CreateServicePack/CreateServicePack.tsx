import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Space,
} from 'antd';
import React from 'react';
import { use } from 'i18next';
import { servicePackHooks } from '../../../hooks';

const { Item } = Form;

const CreateServicePack = ({ onCancel }: { onCancel: any }) => {
  const [form] = Form.useForm();

  const { isUpsertPack, upsertPack } = servicePackHooks.useServicePack();

  const onCreateServicePack = (values: any) => {
    upsertPack(values).then(() =>
      notification.success({
        message: 'Thành công',
        description: 'Tạo gói dịch vụ thành công',
      })
    );
    onCancel();
  };

  return (
    <Form form={form} layout={'vertical'} onFinish={onCreateServicePack}>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Item
            name={'name'}
            label={'Tên gói dịch vụ'}
            rules={[{ required: true }]}
          >
            <Input placeholder={'Tên gói dịch vụ'} />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            name={'number_of_day'}
            label={'Số ngày'}
            rules={[{ required: true }]}
          >
            <InputNumber
              placeholder={'Số ngày'}
              style={{ width: '100%' }}
              min={1}
            />
          </Item>
        </Col>
        <Col span={12}>
          <Item name={'amount'} label={'Giá'} rules={[{ required: true }]}>
            <InputNumber
              addonAfter={'VNĐ'}
              min={1}
              style={{ width: '100%' }}
              placeholder={'Giá gói dịch vụ'}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            />
          </Item>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Space className="mr-base">
          <Button danger type={'primary'} onClick={onCancel}>
            Hủy
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={isUpsertPack}>
            Tạo
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

export default CreateServicePack;
